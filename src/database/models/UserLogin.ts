import { model, Schema } from "mongoose";

const userLoginSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  email: {
    type: String,
    required: true,
  },
});

const User = model("User", userLoginSchema, "users");

export default User;
