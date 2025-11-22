import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    Fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profile: {
      type: String,
      default: "",
    },
  },
  { timestamps: true } //createdAt & updatedAt at fields to the user lastlogin teine and date
);

const User = mongoose.model("User", userSchema);
export default User;
