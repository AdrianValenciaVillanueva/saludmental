const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Crear un nuevo usuario
router.post('/usuarios', usuarioController.createUsuario);

// Iniciar sesión
router.post('/usuarios/login', usuarioController.loginUsuario);

// Obtener todos los usuarios
router.get('/usuarios', usuarioController.getUsuarios);

// Obtener un usuario por ID
router.get('/usuarios/:id', usuarioController.getUsuarioById);

// Actualizar un usuario por ID
router.put('/usuarios/:id', usuarioController.updateUsuario);

// Eliminar un usuario por ID
router.delete('/usuarios/:id', usuarioController.deleteUsuario);

module.exports = router;