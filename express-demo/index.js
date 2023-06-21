const debug = require('debug')('app:startup');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require("joi");
const logger = require('./logger');
const express = require("express");
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

// Configuration
console.log('Application name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...');
}

app.use(logger);



const courses = [
  { id: 1, name: "Maths" },
  { id: 2, name: "Engineering" },
  { id: 3, name: "History" },
];

// PORT
const PORT = process.env.PORT || 3003;

app.get("/", (req, res) => {
  res.render('index', { title: 'My Express App', message: "Hello" });
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  // Look up course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  // Doesn't exist? 404
  if (!course) return res.status(404).send("Course not found.");

  // Validate
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  // Update course & return
  course.name = req.body.name;
  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found.");
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  // Look up course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  // Doesn't exist? 404
  if (!course) return res.status(404).send("Course not found.");

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // Return the same course
  res.send(course);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
