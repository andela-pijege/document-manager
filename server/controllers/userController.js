import omit from 'lodash/omit';

const Users = require('../models').users;
const Documents = require('../models').documents;
const jwt = require('jsonwebtoken');


const displayUserDetails = user => ({
  firstName: user.firstName,
  lastName: user.lastName,
});

const userController = {

  /**
   * @desc Login User
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  login(req, res) {
    if (req.body.email && req.body.password) {
      Users
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
        });
    }
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
        const userAttributes = displayUserDetails(user);
        const userID = user.id;
        const filteredData = omit(user.dataValues, [
          'password',
          'createdAt',
          'updatedAt',
        ]);
        const token = jwt.sign({
          filteredData,
          expiresIn: '2h',
        }, process.env.SECRET_KEY);
        res.status(201).send({ message: 'user created succesfully', token, user: filteredData });
      })
      .catch(error => res.status(400).send(error));
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
    // const limit = parseInt(req.query.limit, 10) || 4;
    // const offset = parseInt(req.query.offset, 10) || 0;
    Users
      .findAndCountAll({
        limit,
        offset,
      })
      .then((users) => {
        const metaData = {
          totalCount: users.count,
          pages: Math.ceil(users.count / limit),
          currentPage: Math.floor(offset / limit) + 1,
          pageSize: users.rows.length,
        };
        res.status(200).send({
          users: users.rows,
          metaData,
        });
      })
      .catch(error => res.status(400).send(error));
  },
  getAll1(req, res) {
    Users
      .findAll()
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
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
      .catch(error => res.status(400).send(error));
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
        res.status(200).send({ users, message: 'user found' });
      })
      .catch(error => res.status(400).send(error));
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
            .update(req.body)
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
      .catch(error => res.status(400).send(error));
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
      .catch(error => res.status(400).send(error));
  },
};
module.exports = userController;

