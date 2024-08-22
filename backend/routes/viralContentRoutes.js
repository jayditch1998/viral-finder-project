const express = require("express");
const router = express.Router();
const ViralContent = require("../models/ViralContent");
const authMiddleware = require("../middleware/authMiddleware");
const authorizationMiddleware = require('../middleware/authorizationMiddleware');

router.post("/", authMiddleware, async (request, response) => {
  const { title, description, url } = request.body;

  try {
    const content = new ViralContent({ title, description, url });
    await content.save();
    response.status(201).json(content);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

router.get("/", authMiddleware, async (request, response) => {
  try {
    const contents = await ViralContent.find();
    response.status(200).json(contents);
  } catch (error) {
    response.status(400).json({error: error.message});
  }
});

router.put('/:id', authMiddleware, async (request, response) => {
  try {
    const { title, description, url } = req.body;
    const content = await ViralContent.findByIdAndUpdate(
      request.params.id,
      { title, description, url },
      { new: true }
    );
    if(!content) return response.status(404).json({ error: 'Content does not exists!'});
    response.status(200).json(content);
  } catch (error) {
    response.status(400).json({error: error.message});
  }
})

router.delete('/:id', authMiddleware,  authorizationMiddleware('admin'), async (req, res) => {
  try {
    const viralContent = await ViralContent.findByIdAndDelete(req.params.id);
    if (!viralContent) return res.status(404).send("Content not found");
    res.json({ message: "Content deleted successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


module.exports = router;