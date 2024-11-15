//exportar librerias
const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');

// Crear una nueva cita
router.post('/citas', citaController.createCita);

// Obtener todas las citas
router.get('/citas', citaController.getCitas);

// Obtener una cita por ID
router.get('/citas/:id', citaController.getCitaById);

// Actualizar una cita por ID
router.put('/citas/:id', citaController.updateCita);

// Eliminar una cita por ID
router.delete('/citas/:id', citaController.deleteCita);

module.exports = router;