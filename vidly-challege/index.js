const Joi = require("joi");
const express = require("express");
const app = express();
const genres = require('./routes/genres');

app.use(express.json());
app.use('/api/genres', genres);

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("Vidly app");
});

