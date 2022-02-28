const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "This filled is required"],
  },
  email: {
    type: String,
    required: [true, "This filled is required"],
    unique: true,
    validate: [isEmail, "Please enter a correct email"],
  },
  password: {
    type: String,
    required: [true, "This filled is required"],
    minlength: [6, "It must be at least 6 characters long"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  verified: {
    type: Boolean,
    require: true,
    default: false,
  },
});

///hashing the instance of the  password before it is save in the database
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    console.log(err.message);
  }
});

//logging  in with the new credentials
userSchema.statics.login = async function (email, password) {
  //used the email he enter to find the credentials of that user in the Database
  const user = await this.findOne({ email });
  // console.log(user);
  if (user) {
    if (user.verified) {
      const match = await bcrypt.compare(password, user.password);
      console.log(match);
      if (match) {
        return user;
      }
      throw Error("incorrect password");
    }
    throw Error("Email has not been verified check your inbox");
  }
  throw Error("incorrect email");
};

//comparing reset new password to old password
userSchema.methods.comparePassword = async function (password) {
  try {
    const result = await bcrypt.compare(password, this.password);
    if (result) {
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoose.model("users", userSchema);
