const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //must do one of the following
  //respond to the front end and end early
  // call next();
  const token = req.header('xauth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
