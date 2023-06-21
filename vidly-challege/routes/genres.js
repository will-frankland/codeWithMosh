const express = require("express");
const router = express.Router();

const genres = [
  { id: 1, name: "Thriller" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Action" },
  { id: 4, name: "Comedy" },
  { id: 5, name: "Drama" },
];

function validateGenre(genere) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genere);
}

router.get("/api/genres", (req, res) => {
  res.send(genres);
});

router.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre not found.");
  res.send(genre);
});

router.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const addGenre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(addGenre);
  res.send(genres);
});

router.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre not found.");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

router.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre not found.");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

module.exports = router;
