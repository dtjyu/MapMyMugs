// Load mongoose package
var mongoose = require('mongoose');

var MugSchema = new mongoose.Schema({
  user_id: String,
  city: String,
  image_location: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Mug', MugSchema);
