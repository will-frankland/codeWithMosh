const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, name: "Maths" },
  { id: 2, name: "Engineering" },
  { id: 3, name: "History" },
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.post("/", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
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

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found.");
  res.send(course);
});

router.delete("/:id", (req, res) => {
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

module.exports = router;
