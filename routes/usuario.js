const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middleware/auth');

// Crear un nuevo usuario
router.post('/usuarios', usuarioController.createUsuario);

// Iniciar sesión
router.post('/usuarios/login', usuarioController.loginUsuario);

// Obtener todos los usuarios
router.get('/usuarios', usuarioController.getUsuarios);

// Ruta para obtener la información del usuario logueado
router.get('/usuarioLogeado', auth, usuarioController.getUsuarioLogeado);


// Obtener un usuario por ID
router.get('/usuarios/:id', usuarioController.getUsuarioById);

// Actualizar un usuario por ID
router.put('/usuarios/:id', usuarioController.updateUsuario);

// Eliminar un usuario por ID
router.delete('/usuarios/:id', usuarioController.deleteUsuario);

module.exports = router;