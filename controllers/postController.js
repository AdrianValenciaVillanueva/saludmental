const Post = require('../models/post');
let io;

// Configurar io
exports.setIo = (socketIo) => {
  io = socketIo;
};

// Crear un nuevo post
exports.createPost = async (req, res) => {
  try {
    const { id_usuario, id_foro, contenido } = req.body;
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