const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: 'Thriller' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Action' },
  { id: 4, name: 'Comedy' },
  { id: 5, name: 'Drama' },
];

function validateGenre(genere) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genere);
}

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get('/', (req, res) => {
  res.send('Vidly app');
});

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre not found.');
  res.send(genre);
});

app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const addGenre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(addGenre);
  res.send(genres);
});

app.put('/api/genres/:id', (req, res) => {
  
});