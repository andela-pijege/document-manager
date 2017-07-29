import omit from 'lodash/omit';

const Users = require('../models').users;
const Documents = require('../models').documents;
const jwt = require('jsonwebtoken');


const userController = {

  /**
   * @desc Login User
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  login(req, res) {
    if ((req.body.email === '' || undefined)) {
      return res.status(400).send({ message: 'Email is required' });
    }
    return Users
        .findOne({ where: { email: req.body.email } })
        .then((user) => {
          if (!user) {
            return res.status(404).send({ message: 'Wrong email' });
          }
          if (user.validate(req.body.password)) {
            const filteredData = omit(user.dataValues, [
              'password',
              'createdAt',
              'updatedAt',
            ]);
            const token = jwt.sign({
              filteredData,
              expiresIn: '2h',
            }, process.env.SECRET_KEY);
            res.status(200).send({ message: 'Login successful', token, user: filteredData });
          } else {
            return res.status(404).send({ message: 'wrong password' });
          }
        })
        .catch(error => res.status(500).send({ message: 'Server error', error }));
  },
  /**
   * @desc Logout User
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  logout(req, res) {
    return res.status(200).send({ message: 'You have been successfully logged out' });
  },
  /**
   * @desc Create a new user
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  create(req, res) {
    Users
      .create(req.body)
      .then((user) => {
        const filteredData = omit(user.dataValues, [
          'password',
          'createdAt',
          'updatedAt',
        ]);
        const token = jwt.sign({
          filteredData,
          expiresIn: '2h',
        }, process.env.SECRET_KEY);
        res.status(201).send({ token, user: filteredData });
      })
      .catch(error => res.status(400).send({ message: 'Error Occured', error }));
  },

  /**
   * @desc Get all Users
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  getAll(req, res) {
    const limit = req.query.limit ? req.query.limit : 10;
    const offset = req.query.offset ? req.query.offset : 0;
    Users
      .findAndCountAll({
        limit,
        offset,
      })
      .then((users) => {
        if (!users) {
          return res.status(404).send({ message: 'No user found' });
        }
        const metaData = {
          totalCount: users.count,
          pages: Math.ceil(users.count / limit),
          currentPage: Math.floor(offset / limit) + 1,
          pageSize: users.rows.length,
        };
        return res.status(200).send({
          users: users.rows,
          metaData,
        });
      })
      .catch(error => res.status(500).send({ message: 'Server error', error }));
  },

  /**
   * @desc Get one user
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
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
      .catch(error => res.status(500).send({ message: 'Server error', error }));
  },

  /**
   * @desc Search for a user
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
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
        res.status(200).send({ users });
      })
      .catch(error => res.status(400).send({ message: 'No user Found', error }));
  },
  /**
   * @desc Updates User
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  update(req, res) {
    Users
      .findById(req.params.id)
      .then((user) => {
        if (user) {
          user
            .update({
              firstName: req.body.firstName || user.firstName,
              lastName: req.body.lastName || user.lastName,
              email: req.body.email || user.email,
              password: req.body.password || user.password,
              roleID: req.body.roleId || user.roleID,
            })
            .then(() => res.status(200).send({
              user,
              message: 'user updated successfully',
            }));
        } else {
          return res.status(404).send({
            message: 'User not Found',
          });
        }
      })
      .catch(error => res.status(500).send({ message: 'Server error', error }));
  },
  /**
   * @desc Deletes User
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  delete(req, res) {
    Users
      .findById(req.params.id)
      .then((user) => {
        if (user) {
          if (user.dataValues.roleID === 1) {
            return res.status(400).send({ message: 'YOU DONT WANNA DO THAT!!' });
          }
          return user
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
      .catch(error => res.status(500).send({ message: 'Server error', error }));
  },
};
module.exports = userController;

