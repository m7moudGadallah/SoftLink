const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now() },
});

const UrlModel = mongoose.model('Url', urlSchema);

module.exports = { UrlModel };
