const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Buscar el token en el encabezado Authorization
  let token = req.header('Authorization')?.split(' ')[1];

  // Si no se encuentra en el encabezado, buscar en las cookies
  if (!token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado' });
  }

  try {
    const verified = jwt.verify(token, 'antisuicidesquad');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token inválido' });
  }
};

module.exports = auth;