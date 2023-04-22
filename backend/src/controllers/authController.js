const { PrismaClient } = require("@prisma/client");
const { verifyPassword } = require("../helpers/argonHelper");
const { encodeJwt } = require("../helpers/jwtHelper");

const prisma = new PrismaClient();

const login = async (req, res) => {
  const { email, pass } = req.body;

  const response = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const passBdd = response.password_hash;
  if (!email) {
    res.status(401).send("Mauvaise données...");
  } else {
    try {
      verifyPassword(pass, passBdd).then((verification) => {
        if (verification) {
          const userAnswer = response;
          delete userAnswer.id;
          delete userAnswer.password_hash;
          const token = encodeJwt(userAnswer);
          res.cookie("token", token, {
            httpOnly: false,
            secure: false,
          });
          res.status(200).json({ email: userAnswer.email });
        } else {
          res.status(401).send("Champs invalides");
        }
      });
    } catch (error) {
      res.status(401).send("dans le catch...");
    }
  }
};

const logout = async (req, res) => {
  res.clearCookie("token").sendStatus(200);
};

module.exports = {
  login,
  logout,
};
