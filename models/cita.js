const mongoose = require('mongoose');

const CitaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    match: [/^[a-zA-Z0-9._%+-]+@alumnos\.udg\.mx$/, 'Correo institucional inválido'],
  },
  metodo: {
    type: String,
    enum: ['correo', 'videollamada', 'presencial'],
    required: true,
  },
});

//exportar el modelo
module.exports = mongoose.model('Cita', CitaSchema);