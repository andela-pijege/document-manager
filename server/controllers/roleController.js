const Roles = require('../models').roles;

const roleController = {
  create(req, res) {
    return Roles
      .create({
        title: req.body.title
      })
      .then(() => res.status(201).send({message: 'role created succesfully'}))
      .catch(error => res.status(500).send(error));
  },
};

module.exports = roleController;
