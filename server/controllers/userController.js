import omit from 'lodash/omit';

const Users = require('../models').users;
const Documents = require('../models').documents;
const jwt = require('jsonwebtoken');


const displayUserDetails = (user) => ({
  firstName: user.firstName,
  lastName: user.lastName,
});

const userController = {
  login(req, res) {
    if (req.body.email && req.body.password) {
      Users
        .findOne({ where: { email: req.body.email } })
        .then((user) => {
          if (!user) {
            return res.status(404).send({ message: 'Wrong email' });
          }
          if (user.validate(req.body.password)) {
            const userID = user.id;
            const roleID = user.roleID;
            const filteredData = omit(user, [
              'password',
            ]);
            const token = jwt.sign(filteredData, process.env.SECRET_KEY);
            res.status(200).send({ message: 'Login successful', token, userID, roleID });
          } else {
            return res.status(404).send({ message: 'its some wrong password shit' });
          }
        });
    }
  },
  logout(req, res) {
  },
  create(req, res) {
    Users
      .create(req.body)
      .then((user) => {
        const userAttributes = displayUserDetails(user);
        const userID = user.id;
        const token = jwt.sign({
          data: user.id,
          expiresIn: '2h',
        }, process.env.SECRET_KEY);
        res.status(201).send({ message: 'user created succesfully', userAttributes, token, userID });
      })
      .catch(error => res.status(400).send(error));
  },
  getAll1(req, res) {
    // console.log('getting all users', req.query.limit, req.query.offset);
    // const limit = parseInt(req.query.limit, 10) || 4;
    // const offset = parseInt(req.query.offset, 10) || 0;
    Users
      .findAndCountAll()
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  },
  getAll(req, res) {
    Users
      .findAll()
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  },
  getOneUser(req, res) {
    Users
      .findById(req.params.id)
      .then((user) => {
        if (user) {
          return res.status(200).send(user);
        }
        return res.status(404).send({
          message: 'User does not exist',
        });
      })
      .catch(error => res.status(400).send(error));
  },
  searchUser(req, res) {
    const { name } = req.query;
    Users
      .findAll({
        where: {
          $or: [
            { firstName: { $iLike: `%${name}%` } },
            { lastName: { $iLike: `%${name}%` } },
          ],
        },
      })
      .then((users) => {
        res.status(200).send({ users, message: 'user found' });
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    Users
      .findById(req.params.id)
      .then((user) => {
        if (user) {
          user
            .update(req.body)
            .then(() => res.status(200).send({
              message: 'user updated successfully',
            }));
        } else {
          return res.status(404).send({
            message: 'User not Found',
          });
        }
      })
      .catch(error => res.status(500).send(error));
  },
  delete(req, res) {
    Users
      .findById(req.params.id)
      .then((user) => {
        if (user) {
          user
            .destroy()
            .then(() => {
              res.status(200).send({
                message: 'User successfully Deleted',
              });
            });
        } else {
          return res.status(400).send({
            message: 'User not found',
          });
        }
      })
      .catch(error => res.status(500).send(error));
  },
  getDocuments(req, res) {
    Documents
      .findAll({
        where: { userID: req.params.id },
      })
      .then((documents) => {
        res.status(200).send({ documents });
      })
      .catch(error =>
        res.status(400).json({ msg: error.message }),
    );
  },
};
module.exports = userController;

