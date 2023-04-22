/* eslint-disable camelcase */
const { PrismaClient } = require("@prisma/client");
const { validateUser } = require("../utils/validateUser");
const { hashPassword } = require("../helpers/argonHelper");

const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  try {
    const response = await prisma.user.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const response = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const createUser = async (req, res) => {
  const { email, password_hash, role } = req.body;
  const validate = validateUser({
    email,
    password_hash,
    role,
  });
  if (validate) {
    res.status(422).json({ validate });
  } else {
    try {
      const hashed = await hashPassword(password_hash);
      const user = await prisma.user.create({
        data: {
          email,
          password_hash: hashed,
          role,
        },
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
};

const updateUser = async (req, res) => {
  const { email, password_hash, role } = req.body;
  const validate = validateUser({
    email,
    password_hash,
    role,
  });
  if (validate) {
    res.status(422).json({ validate });
  } else {
    try {
      const hashed = await hashPassword(password_hash);
      const user = await prisma.user.update({
        where: { id: Number(req.params.id) },
        data: {
          email,
          password_hash: hashed,
          role,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
