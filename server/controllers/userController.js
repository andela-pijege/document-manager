const Users = require('../models').users;

const displayUserDetails = (user) => {
  return {
    firstName: user.firstName,
    lastName: user.lastName
  }
}

const userController = {
  login(req, res) {
    console.log(req.body);
    if(req.body.email && req.body.password) {
      Users
        .findOne({where: {email: req.body.email}})
        .then((user) => {
          console.log('Out here', user.password);
          if(!user) {
            console.log('first branch, email does not exist::::::::::::::::::::::::');
            return res.status(404).send({message: 'Wrong email'});
          }
          if(user.validate(req.body.password)) {
            console.log('Second branch Login successful::::::::::::::::::::::::::');
            res.status(200).send({message: 'Login successful'});
          } else {
            console.log('third branch, Wrong password::::::::::::::::::::::::::::::');
            return res.status(404).send({message: 'its some wrong password shit'})
          }
        })
    }
  },
  logout(req, res) {
  },
  create(req, res) {
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

