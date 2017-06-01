const bcrypt = require('bcrypt');
const Users = require('../models').users;

const displayUserDetails = (user) => {
  return {
    firstName: user.firstName,
    lastName: user.lastName
  }
}

const userController = {
  create(req, res) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    Users
      .create(req.body)
      .then((user) => {
        let userAttributes = displayUserDetails(user)
        res.status(201).send({message: 'user created succesfully', userAttributes })
      })
      .catch(error => res.status(400).send(error));
  },
  getAll(req, res) {
    Users
    .findAll()
    .then((users) => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
  },
  getOneUser(req, res) {
    Users
      .findById(req.params.id)
      .then((user) => {
        if(user) {
          return res.status(200).send(user);
        } else {
          return res.status(404).send({
            message: 'User does not exist'
          })
        }
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    Users
      .findById(req.params.id)
      .then((user) => {
        if(user) {
          user
            .update(req.body)
            .then(() => res.status(200).send({
              message: 'user updated successfully'}))
        } else {
          return res.status(404).send({
            message: 'User not Found'
          })
        }
      })
      .catch(error => res.status(500).send(error));
  },
  delete(req, res) {
    Users
      .findById(req.params.id)
      .then((user) => {
        if(user){
          user
            .destroy()
            .then(() => {
              res.status(200).send({
                message: 'User successfully Deleted'
              })
            })
        } else {
          return res.status(400).send({
            message: 'User not found'
          })
        }
      })
      .catch(error => res.status(500).send(error))
  }
};
module.exports = userController;
