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
      .catch(error => res.status(400).send({ msg: 'Role could not be created', error }));
  },

 /**
   * @desc Get all roles
   * @param {object} request - The request sent to the route
   * @param {object} response - The response sent back
   * @return {object} json response
   */
  getAll(request, response) {
    Roles
      .findAll()
      .then((roles) => {
        response.status(200).send({ roles });
      })
      .catch(error => response.status(400).json({ msg: error.message }));
  },
  /**
   * @desc updates an existing role role
   * @param {object} request - The request sent to the route
   * @param {object} response - The response sent back
   * @return {object} json response
   */
  update(request, response) {
    Roles
      .findById(request.params.id)
      .then((role) => {
        if (role) {
          role
            .update(request.body)
            .then(() => response.status(200).send({
              message: 'Role updated successfully',
            }));
        } else {
          return response.status(404).send({ message: 'Role not found' });
        }
      })
      .catch(error => response.status(500).json({ msg: error.message }));
  },
  /**
   * @desc Create a new role
   * @param {object} request - The request sent to the route
   * @param {object} response - The response sent back
   * @return {object} json response
   */
  delete(request, response) {
    const roleId = request.params.id;
    Roles
      .findById(roleId)
      .then((role) => {
        if (!role) {
          return response.status(404).send({ message: 'Role Does not exist' });
        }
        return role.destroy()
        .then(() => response.status(200).send({ message: 'Role deleted successfully' }));
      })
      .catch(error => response.status(500).json({ msg: 'Server error', error }));
  },
};

module.exports = roleController;
