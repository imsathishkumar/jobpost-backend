const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validateUser } = require("../../model/user");

const schema = Joi.object({
  email: Joi.string().min(5).max(60).required().email(),
  password: Joi.string().min(5).max(255).required(),
});

async function login(req, res) {
  try {
    console.log("login");
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).send({
        message: "please fill required details",
      });
    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send({message:"Invalid user"});
    const validate = await bcrypt.compare(req.body.password,user.password);
    if(!validate) return res.status(401).send({message:"Unauthorized User"})

    const token = user.generateAuthToken();
    res.status(200).send({
      message: "user login successfully",
      token: token
    });
  } catch (err) {
    res.status(400).send(err);
  }
}

async function signup(req, res) {
  try {
    const { error } = validateUser(req.body);
    if (error)
      return res.status(400).send({ message: "please fill all the detail" });
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send({ message: "User already exist" });

    user = new User(_.pick(req.body, ["username", "email", "password","type"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    res.status(200).send({
      message: "user created",
      token: token,
    });
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = { signup, login };
