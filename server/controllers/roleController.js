const Roles = require('../models').roles;

const roleController = {
  /**
   * @desc Create a new role
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  create(req, res) {
    return Roles
      .create({
        title: req.body.title,
      })
      .then(() => res.status(201).send({ message: 'role created succesfully' }))
      .catch(error => res.status(500).send(error));
  },
};

module.exports = roleController;
