const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const findAll = async () => {
  try {
    return await prisma.events.findMany();
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  findAll,
};
