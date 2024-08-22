const authorizationMiddleware = (requiredRole) => {
  return (request, response, next) => {
    try {
      const user = request.user; 
      if (user.isAdmin || user.role === requiredRole) {
        next();
      } else {
        response.status(403).json({ msg: 'Access denied' });
      }
    } catch (err) {
      response.status(401).json({ msg: 'Unauthorized' });
    }
  };
};

module.exports = authorizationMiddleware;
