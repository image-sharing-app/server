const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err.name === "WrongPassword") {
    res.status(400).json({ message: "Wrong password!" });
  } else if (err.name === "ErrorNotFound") {
    res.status(404).json({ message: "Error not found!" });
  } else if (err.name === "AlreadyExist") {
    res.status(400).json({ message: "Data already exist!" });
  } else if (err.name === "UserExist") {
    res.status(400).json({ message: "Email already exist!" });
  } else {
    res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports = errorHandler;
