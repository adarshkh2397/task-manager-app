const mongoose = require("mongoose");
const autoValidator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

module.exports = userSchema;
