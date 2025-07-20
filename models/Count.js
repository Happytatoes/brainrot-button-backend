const mongoose = require('mongoose');

const countSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Count', countSchema);