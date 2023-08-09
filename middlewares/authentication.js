require("dotenv").config();
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization === undefined) {
      res.status(401).json({ message: "Unauthorized!" });
    } else {
      const token = authorization.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (error, data) => {
        if (error) {
          res.status(401).json({ message: "Invalid signature!" });
        } else {
          req.userLogged = {
            id: data.id,
            name: data.name,
            email: data.email,
          };
          next();
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = authentication;
