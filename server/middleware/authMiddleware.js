// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Bearer token-la irunthu 'Bearer ' eduthutu token matum edukrom
    const actualToken = token.split(" ")[1]; 
    const decoded = jwt.verify(actualToken, 'MY_SECRET_KEY');
    
    req.user = decoded; // User ID-a request kooda serthu vidrom
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = protect;