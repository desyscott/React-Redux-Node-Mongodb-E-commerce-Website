const express = require("express");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { isValidObjectId } = require("mongoose");

const router = express.Router();

const authModel = require("../models/authModel");
const userEmailConfirmation = require("../models/userEmailConfirmation");
const resetPassword = require("../models/resetPasswordModel");
const { isResetTokenValid } = require("../middleware/resetTokenValid");
const { mailTransport } = require("../utilitis/Mail");
const { sendError } = require("../utilitis/responseHandler");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {
    name: "",
    email: "",
    password: "",
    emailVerifyMessage: "",
  };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
    return errors;
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "The password is incorrect ";
    return errors;
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "This email has already been registered";
    return errors;
  }

  if (err.message === "Email has not been verified check your inbox") {
    errors.emailVerifyMessage = "Email has not been verified check your inbox";
    return errors;
  }

  // validation errors
  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

router.post("/signUp", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await authModel.create({
      name,
      email,
      password,
    });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    const uniqueString = uuidv4() + user._id;
    const verifyUserEmail = userEmailConfirmation.create({
      userId: user._id,
      uniqueString: uniqueString,
    });

    mailTransport().sendMail({
      from: process.env.AUTH_EMAIL,
      to: user.email,
      subject: "verify your account",
      html: `<h1>welcome to Shop Now!!!! ${user.name}</h1>
      <p>You’re receiving this message because you recently signed up for a Shop Now!!!! account.
      Confirm your email address by clicking the button below. This step adds extra security to your business by verifying you own this email.</p>
      
      <a href=${
        process.env.BASE_URL +
        "/email-verification/" +
        user._id +
        "/" +
        uniqueString
      }>confirm email</a>
      <p>This link will expire in 1hour. If you have questions, <a>we’re here to help.</a></p>`,
    });
    res.status(201).json({ user: user });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors });
  }
});

router.get("/email-verification/:userId/:uniqueString", async (req, res) => {
  const { userId, uniqueString } = req.params;
  if (!userId || !uniqueString)
    return sendError(res, "invalid request,missing parameters");

  if (!isValidObjectId(userId))
    return sendError(res, "invalid request,missing parameters");

  const user = await authModel.findById(userId);
  if (!user) return sendError(res, "sorry user not found");

  if (user.verified) return sendError(res, "user has already been verified");

  const userToken = await userEmailConfirmation.findOne({ userId: user._id });
  if (!userToken)
    return sendError(res, "The email verification link is invalid");

  const verifyUniqueString = await userToken.verifyUniqueString(uniqueString);
  if (!verifyUniqueString)
    return sendError(res, "The email verification link is invalid ");

  await userEmailConfirmation.findByIdAndDelete(userToken._id);

  await authModel.updateOne({ _id: user._id }, { verified: true });

  mailTransport().sendMail({
    from: process.env.AUTH_EMAIL,
    to: user.email,
    subject: "Email Successfully verified",
    html: `<p>Email verified Successfully.Thanks for connecting with us.</p>`,
  });

  res.json("your email is verified");

  console.log("your email is verified");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) return sendError(res, "email filed must not be empty");

  if (!password) return sendError(res, "password filed must not be empty");

  try {
    const user = await authModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors });
  }
});

router.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json("logout successful");
});

router.post("/forget-password", async (req, res) => {
  const { email } = req.body;
  // res.json(req.body);
  if (!email) return sendError(res, "please provide a valid user");

  const user = await authModel.findOne({ email });
  if (!user) return sendError(res, "sorry user not found");

  const userToken = await resetPassword.findOne({ userId: user._id });
  if (userToken)
    return sendError(
      res,
      " only after one hour before you can request another one "
    );

  const uniqueToken = uuidv4() + user._id;
  const resetPasswordToken = await resetPassword.create({
    userId: user._id,
    uniqueToken: uniqueToken,
  });

  mailTransport().sendMail({
    from: process.env.AUTH_EMAIL,
    to: user.email,
    subject: "Password Reset",
    html: `<p>Someone just requested to change your shop Now account's password. If this was you, click on the link below to reset it.</p>
        <a href=${
          process.env.BASE_URL +
          "/reset-password?uniqueToken=" +
          uniqueToken +
          "&id=" +
          user._id
        }>reset password</a>
          This link will expire within 2 hours.
    
      <p>If you don't want to reset your credentials, just ignore this message and nothing will be changed</p>`,
  });
  res.json("password reset link as been sent Successfully");
});

router.post("/reset-password", isResetTokenValid, async (req, res) => {
  const { password } = req.body;

  const user = await authModel.findById(req.user._id);
  if (!user) return sendError(res, "sorry user not found");

  const isSamePassword = await user.comparePassword(password);
  if (isSamePassword) return sendError(res, "use a new password");

  user.password = password.trim();
  await user.save();

  await resetPassword.findOneAndDelete({ userId: user._id });

  mailTransport().sendMail({
    from: process.env.AUTH_EMAIL,
    to: user.email,
    subject: "Successful password reset",
    html: `
    <p>Your password reset has been successful</p>
    <p>Now you can login your account with your new password.</p>`,
  });
  res.send({ success: true, message: "password reset successful" });
});

router.get("/verify-resetToken", isResetTokenValid, (req, res) => {
  res.json({ success: true });
});

module.exports = router;
