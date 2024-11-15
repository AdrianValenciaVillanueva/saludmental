const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

const indexRouter = require('./routes/index');
const usuariosRouter = require('./routes/usuario');
const forosRouter = require('./routes/foros');
const postsRouter = require('./routes/posts');
//conectar a la base de datos
connectDB();

const app = express();

app.use(cors()); // Permitir solicitudes desde el frontend
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);
app.use('/api', usuariosRouter);
app.use('/api', forosRouter);
app.use('/api', postsRouter);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ error: err.message });
});

// Configuración del puerto y arranque del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;