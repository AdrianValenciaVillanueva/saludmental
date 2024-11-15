const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  codigo: {
    type: String,
    required: true,
  },
  sexo: {
    type: String,
    enum: ['masculino', 'femenino', 'prefiero no decirlo'],
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@alumnos\.udg\.mx$/, 'Correo institucional inválido'],
  },
  contrasena: {
    type: String,
    required: true,
    minlength: 8,
    match: [/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/, 'Contraseña debe ser alfanumérica, con números y al menos un símbolo especial'],
  },
});

// Antes de guardar el usuario, hashear la contraseña
UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('contrasena')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.contrasena = await bcrypt.hash(this.contrasena, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);