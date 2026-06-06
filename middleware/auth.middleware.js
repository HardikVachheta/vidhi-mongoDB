const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecretkey";

function auth(req, res, next) {
  // console.log("middleware");
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Token Missing..." });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

function roleCheck(roles) {
  console.log("role : ",roles)
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Permission denied.`,
      });
    }
    next();
  };
}

module.exports = { roleCheck, auth };
