const users = require("../models/usersModel");

const getAll = async (req, res) => {
  const result = await users.findAll();
  const newResults = result.map((elem) => ({
    id: elem.id,
    email: elem.email,
    password_hash: elem.password_hash,
  }));
  res.status(200).json(newResults);
};

module.exports = {
  getAll,
};
