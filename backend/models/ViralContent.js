const mongoose = require("mongoose");

const viralContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ViralContent = mongoose.model('ViralContent', viralContentSchema);

module.exports = ViralContent;
