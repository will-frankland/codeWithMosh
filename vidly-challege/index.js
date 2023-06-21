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

app.get('/genres', (req, res) => {
  res.send(genres);
});