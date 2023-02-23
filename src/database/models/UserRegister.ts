import { Joi } from "express-validation";
import { model, Schema } from "mongoose";

const UserRegisterSchema = new Schema({
  name: Joi.string().required(),
  password: Joi.string().min(10).required(),
  phoneNumber: Joi.string().optional(),
  email: Joi.string().email().required(),
  adress: Joi.string().optional(),
  image: Joi.string().required(),
});

const UserRegister = model("UserRegister", UserRegisterSchema, "users");

export default UserRegister;
