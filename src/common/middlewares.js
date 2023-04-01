const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '../.env'),
});

exports.isAuth = async (req, res, next) => {
  try {
    if (!req?.headers?.authorization)
      return res.status(409).json({ message: 'Token missing' });
    const token = req?.headers?.authorization.split(' ')[1];
    const userid = req.headers.userid;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded._id === userid) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role == 'admin') {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
};
