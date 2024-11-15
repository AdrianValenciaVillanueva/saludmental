const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  id_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  id_foro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Foro',
    required: true,
  },
  contenido: {
    type: String,
    required: true,
  },
  fecha_publicacion: {
    type: Date,
    default: Date.now,
  },
  fecha_actualizacion: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', PostSchema);