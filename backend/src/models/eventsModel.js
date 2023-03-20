const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const findAll = async () => {
  try {
    return await prisma.event.findMany();
  } finally {
    await prisma.$disconnect();
  }
};

const createOne = async (event) => {
  try {
    return await prisma.event.create({
      data: { ...event },
    });
  } finally {
    await prisma.$disconnect();
  }
};

const deleteOne = async (eventId) => {
  try {
    return await prisma.event.delete({
      where: { id: eventId },
    });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  findAll,
  createOne,
  deleteOne,
};
