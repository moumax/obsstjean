const event = require("../models/eventsModel");

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

module.exports = {
  getAll,
};
