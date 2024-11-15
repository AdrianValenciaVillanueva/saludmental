const mongoose = require('mongoose');

const ForoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Foro', ForoSchema);