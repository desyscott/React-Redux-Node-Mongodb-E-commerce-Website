const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userEmailConfirmation = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "users",
  },
  uniqueString: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

userEmailConfirmation.pre("save", async function (next) {
  try {
    console.log(this.uniqueString);
    const salt = await bcrypt.genSalt();
    this.uniqueString = await bcrypt.hash(this.uniqueString, salt);
    next();
  } catch (error) {
    console.log(error.message);
  }
});

userEmailConfirmation.methods.verifyUniqueString = async function (
  uniqueString
) {
  const result = await bcrypt.compare(uniqueString, this.uniqueString);

  if (result) {
    return result;
  }
  console.log(`uniqueString is verified : ${result} `);
};

module.exports = mongoose.model("userEmailConfirmation", userEmailConfirmation);
