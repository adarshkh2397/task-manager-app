const mongoose = require("mongoose");
const autoValidator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
  },
  email: {
    type: String,
    validate: {
      validator: (val) => {
        return autoValidator.isEmail(val);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    minLength: [7, "Password must be greater than 6 characters"],
    trim: true,
    validate(val) {
      if (val.toLowerCase().includes("password")) {
        throw new Error("Password cannot contain 'password'");
      }
    },
    required: [true, "Password is required"],
  },
  age: {
    type: Number,
    validate: {
      validator: (val) => {
        return val >= 0;
      },
      message: (props) => `${props.value} is not a vaid age!`,
    },
  },
});

module.exports = User;
