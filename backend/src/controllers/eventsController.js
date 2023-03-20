const { PrismaClient } = require("@prisma/client");
const { validateEvent } = require("../utils/validate");

const prisma = new PrismaClient();

const getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    if (events.length === 0) {
      res.status(204).json({
        Message: "La liste des events est vide",
      });
    } else res.json({ events });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: "Une erreur est survenue lors de la récupération des events",
    });
  }
};

const createEvent = async (req, res) => {
  const { title, description, date, site, userId } = req.body;
  const error = validateEvent({
    title,
    description,
    date,
    site,
    userId,
  });
  if (error) {
    res.status(422).json({ error });
  } else {
    try {
      const newEvent = await prisma.event.create({
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
      res.json(newEvent);
    } catch (e) {
      console.error(e);
      res.status(500).json({
        error: "Une erreur est survenue lors de la création de l'événement.",
      });
    }
  }
};

const updateEvent = async (req, res) => {
  const eventId = Number(req.params.id);
  const { title, description, date, site, userId } = req.body;
  const error = validateEvent({
    title,
    description,
    date,
    site,
    userId,
  });
  if (error) {
    res.status(422).json({ error });
  } else {
    try {
      const eventUpdated = await prisma.event.update({
        where: { id: eventId },
        data: {
          title,
          description,
          date,
          site,
          userId,
        },
      });
      return res.status(200).send({ eventUpdated });
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .json({ error: "Impossible de mettre à jour l'event" });
    } finally {
      await prisma.$disconnect();
    }
  }
  return null;
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await prisma.event.delete({
      where: { id: Number(id) },
    });
    res.json({
      message: `L'événement ${event.title} avec l'identifiant ${id} a été supprimé.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Une erreur est survenue lors de la suppression de l'événement.",
    });
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
