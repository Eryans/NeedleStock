const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get Token from header
      token = req.headers.authorization.split(" ")[1];
      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      console.log(err);
      res.status(400).json({message: "ACCÈS REFUSÉ"});
    }
  }
  if (!token) {
    res.status(401).json({message: "PAS AUTHORISÉ"});
  }
};
module.exports = {protect}