const Foro = require('../models/foros');

// Crear un nuevo foro
exports.createForo = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevoForo = new Foro({ nombre });
    await nuevoForo.save();
    res.status(201).json(nuevoForo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener todos los foros
exports.getForos = async (req, res) => {
  try {
    const foros = await Foro.find();
    res.json(foros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un foro por ID
exports.getForoById = async (req, res) => {
  try {
    const foro = await Foro.findById(req.params.id);
    if (!foro) {
      return res.status(404).json({ message: 'Foro no encontrado' });
    }
    res.json(foro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un foro por ID
exports.updateForo = async (req, res) => {
    try {
      const { nombre } = req.body;

      const foro = await Foro.findByIdAndUpdate(req.params.id,{ nombre },
      );

      if (!foro) {
        return res.status(404).json({ message: 'Foro no encontrado' });
      }
      res.json(foro);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

// Eliminar un foro por ID
exports.deleteForo = async (req, res) => {
    try {
      const foro = await Foro.findByIdAndDelete(req.params.id);
      if (!foro) {
        return res.status(404).json({ message: 'Foro no encontrado' });
      }
      res.json({ message: 'Foro eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };