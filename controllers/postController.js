const Post = require('../models/post');
const axios = require('axios');
let io;

// Configurar io
exports.setIo = (socketIo) => {
  io = socketIo;
};

// Crear un nuevo post
exports.createPost = async (req, res) => {
  try {
    const { id_foro, contenido } = req.body;
    const id_usuario = req.user.id; // Obtener el id_usuario del token

    // Validar que todos los campos estén presentes
    if (!id_usuario || !id_foro || !contenido) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Filtrar palabras ofensivas usando la API de Perspective
    const apiKey = 'AIzaSyAUFART6my3ALDQWODp3CfxlpWnRsRGx-w'; // Reemplaza con tu clave API de Perspective
    const url = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${apiKey}`;
    const response = await axios.post(url, {
      comment: { text: contenido },
      languages: ['es'],
      requestedAttributes: { TOXICITY: {} }
    });

    const toxicityScore = response.data.attributeScores.TOXICITY.summaryScore.value;
    if (toxicityScore >= 0.07) { // Ajusta el umbral según tus necesidades
      return res.status(400).json({ error: 'El contenido contiene palabras ofensivas' });
    }

    const nuevoPost = new Post({ id_usuario, id_foro, contenido });
    await nuevoPost.save();
    res.status(201).json(nuevoPost);
    io.emit('newPost', nuevoPost); // Emitir evento de nuevo post
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Obtener todos los posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener post por id_foro
exports.getPostByForo = async (req, res) => {
  try {
    const posts = await Post.find({ id_foro: req.params.id_foro });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un post por ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un post por ID
exports.updatePost = async (req, res) => {
  try {
    const { titulo, contenido, autor } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    post.titulo = titulo || post.titulo;
    post.contenido = contenido || post.contenido;
    post.autor = autor || post.autor;

    await post.save();
    res.json(post);
    io.emit('updatePost', post); // Emitir evento de actualización de post
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un post por ID
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }
    res.json({ message: 'Post eliminado' });
    io.emit('deletePost', post._id); // Emitir evento de eliminación de post
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};