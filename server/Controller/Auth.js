const AsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// this Middler ware function extract the token from headers and checks the validation of the user
const Middleware = AsyncHandler(async (req, res, next) => {
  //  checks the authorization header is available or not
  let token = req.headers["authorization"];
  // if authorization header is not available then prompt an error message
  if (!token) {
    res.json({
      message: "user is not authenticated",
    });
  } else {
    // separating the toke  from Bearer  and store in token variable
    token = token.split(" ")[1];

    // checks the token is valid or not
    let validToken = jwt.verify(token, process.env.SECRET_KEY);
    // if token is valid then setting user id to response id (userId)
    if (validToken) {
      req.userId = validToken._id;
      next();
    } else {
      // if token is invalid then prompt the error message
      res.json({ message: "invalid token " });
    }
  }
});

module.exports = { Middleware };
