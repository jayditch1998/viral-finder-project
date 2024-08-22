const jwt = require('jsonwebtoken');

const authMiddleware = (request, response, next) => {
  const token = request.header('x-auth-token');
  if(!token) return response.status(401).json({msg: 'No token, authorization denied'});

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded.userId;
    next();
  } catch (error) {
    response.status(401).json({msg: 'Token is not valid'});
  }
};

module.exports = authMiddleware;