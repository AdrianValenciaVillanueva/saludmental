//importar el modelo de cita
const Cita = require('../models/cita');

// Crear una nueva cita
exports.createCita = async (req, res) => {
  try {
    const { nombre, correo, metodo } = req.body;
    const nuevaCita = new Cita({ nombre, correo, metodo });
    await nuevaCita.save();
    res.status(201).json(nuevaCita);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener todas las citas
exports.getCitas = async (req, res) => {
  try {
    const citas = await Cita.find();
    res.json(citas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener una cita por ID
exports.getCitaById = async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id);
    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.json(cita);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar una cita por ID
exports.updateCita = async (req, res) => {
  try {
    const { nombre, correo, metodo } = req.body;
    const cita = await Cita.findById(req.params.id);
    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    cita.nombre = nombre || cita.nombre;
    cita.correo = correo || cita.correo;
    cita.metodo = metodo || cita.metodo;
    
    await cita.save();
    res.json(cita);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Eliminar una cita por ID
exports.deleteCita = async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id);
    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    await cita.remove();
    res.json({ message: 'Cita eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
