const jwt = require('jsonwebtoken');

exports.check = function(req, res, next) {
  const authHeader = req.header('authorization');

  if (!authHeader) {
    // forbidden
    res.json({
      status: false,
      message: 'No authorization header present',
    });
    return;
  }

  const [type, token] = authHeader.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    // invalid token type
    res.json({
      status: false,
      message: 'Invalid authorization type, supported Bearer',
    });
    return;
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    // invalid token type
    res.json({
      status: false,
      message: 'Invalid token',
    });
  }
};
