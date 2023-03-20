const event = require("../models/eventsModel");
const { validateEvent } = require("../utils/validate");

const getAll = async (req, res) => {
  const result = await event.findAll();
  const newResults = result.map((elem) => ({
    id: elem.id,
    title: elem.title,
    description: elem.description,
    date: elem.date,
    site: elem.site,
    createdAt: elem.createdAt,
    updatedAt: elem.updatedAt,
    userId: elem.userId,
  }));
  res.status(200).json(newResults);
};

const createOne = async (req, res) => {
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
      const eventCreated = await event.createOne({
        title,
        description,
        date,
        site,
        userId,
      });
      return res.status(201).send({ eventCreated });
    } catch (e) {
      console.warn(e);
      return res.status(500).json({ error: "Problème de création d'un event" });
    }
  }
  return null;
};

const deleteOne = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  const result = await event.deleteOne(userId);
  if (result) {
    delete result.password_hash;
    return res.status(200).json({ "utilisateur supprimé : ": { result } });
  }
  return res.status(404).json({ Erreur: "L'utilisateur n'existe pas" });
};

module.exports = {
  getAll,
  createOne,
  deleteOne,
};
