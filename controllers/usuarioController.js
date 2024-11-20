const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    const { nombre, codigo, sexo, correo, contrasena } = req.body;
    const nuevoUsuario = new Usuario({ nombre, codigo, sexo, correo, contrasena });
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Iniciar sesión
exports.loginUsuario = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: usuario._id, nombre: usuario.nombre }, 'antisuicidesquad', { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // Cambia a true si estás usando HTTPS
      sameSite: 'None', // Permite que la cookie se envíe en todas las solicitudes
      path: '/' 
    });
    res.json({ message: 'Inicio de sesión exitoso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//onbtener usuario logeado
exports.getUsuarioLogeado = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const decoded = jwt.verify(token, 'antisuicidesquad');
    const usuario = await Usuario.findById(decoded.id).select('-contrasena');
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un usuario por ID
exports.updateUsuario = async (req, res) => {
  try {
    const { nombre, codigo, sexo, correo, contrasena } = req.body;
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    usuario.nombre = nombre || usuario.nombre;
    usuario.codigo = codigo || usuario.codigo;
    usuario.sexo = sexo || usuario.sexo;
    usuario.correo = correo || usuario.correo;

    if (contrasena) {
      const salt = await bcrypt.genSalt(10);
      usuario.contrasena = await bcrypt.hash(contrasena, salt);
    }

    await usuario.save();
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un usuario por ID
exports.deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await usuario.remove();
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};