const express = require("express");
const router = express.Router();
const Developer = require("../models/developers");

// retrieve all
router.get("/", async (req, res) => {
  try {
    const developers = await Developer.find();
    res.json(developers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// retrieve one
router.get("/:id", getDeveloper, (req, res) => {
  res.json(res.developer);
});

// create one
router.post("/", async (req, res) => {
  const developer = new Developer({
    name: req.body.name,
    product: req.body.product,
  });
  try {
    const newDeveloper = await developer.save();
    res.status(201).json(newDeveloper);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// update one
router.patch("/:id", getDeveloper, async (req, res) => {
  if (req.body.name != null) {
    res.developer.name = req.body.name;
  }
  if (req.body.product != null) {
    res.developer.product = req.body.product;
  }
  try {
    const updatedDeveloper = await res.developer.save();
    res.json(updatedDeveloper);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete one
router.delete("/:id", getDeveloper, async (req, res) => {
  try {
    await res.developer.remove();
    res.json({ message: "Deleted Successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get by id
async function getDeveloper(req, res, next) {
  let developer;
  try {
    developer = await Developer.findById(req.params.id);
    if (developer == null) {
      return res.status(404).json({ message: "Cannot find Developer!" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.developer = developer;
  next();
}

module.exports = router;
