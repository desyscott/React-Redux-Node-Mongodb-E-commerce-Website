const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  //request the jwt from the front end
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
      if (err) {
        const error = err.message;
        res.json({ error });
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.json("there is no token");
  }
};

module.exports = { authMiddleware };
