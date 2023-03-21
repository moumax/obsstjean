const { PrismaClient } = require("@prisma/client");
const { validateEvent } = require("../utils/validate");

const prisma = new PrismaClient();

const getEvents = async (req, res) => {
  try {
    const response = await prisma.event.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const response = await prisma.event.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const createEvent = async (req, res) => {
  const { title, description, date, site, userId } = req.body;
  const validate = validateEvent({
    title,
    description,
    date,
    site,
    userId,
  });
  if (validate) {
    res.status(422).json({ validate });
  } else {
    try {
      const event = await prisma.event.create({
        data: {
          title,
          description,
          date,
          site,
          user: {
            connect: { id: Number(userId) },
          },
        },
      });
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
};

const updateEvent = async (req, res) => {
  const { title, description, date, site, userId } = req.body;
  const validate = validateEvent({
    title,
    description,
    date,
    site,
    userId,
  });
  if (validate) {
    res.status(422).json({ validate });
  } else {
    try {
      const event = await prisma.event.update({
        where: { id: Number(req.params.id) },
        data: {
          title,
          description,
          date,
          site,
          userId,
        },
      });
      res.status(200).json(event);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await prisma.event.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
