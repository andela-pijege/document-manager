const jwt = require('jsonwebtoken');

module.exports = {
  /**
   * @desc Authenticates User by JWT Token
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @param {object} next - Move to the next action
   * @return {object} json response
   */
  authorize(req, res, next) {
    jwt.verify(req.headers.authorization,
    process.env.SECRET_KEY,
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'INVALID TOKEN' });
      }
      req.decoded = decoded.filteredData;
      next();
    });
  },
};
