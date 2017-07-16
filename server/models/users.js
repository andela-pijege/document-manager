'use strict';

const bcrypt = require('bcrypt');
module.exports = function (sequelize, DataTypes) {
  var users = sequelize.define('users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: ['^[a-z-]+$', 'i'],
          msg: 'firstName can only contain letters and/or -',
        },
        len: {
          args: [2, 12],
          msg: 'firstName cannot be less than 2 or greater than 12 characters',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: ['^[a-z-]+$', 'i'],
          msg: 'lasttName can only contain letters and/or -',
        },
        len: {
          args: [2, 12],
          msg: 'lastName cannot be less than 2 or greater than 12 characters',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'This email is already in use',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Email is not valid',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isRequiredLength(val) {
          if (val.length < 8) {
            throw new Error('password cannot be less than 8 characters');
          }
        },
      },
    },
    roleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: function (models) {
        users.belongsTo(models.roles, {
          foreignKey: 'roleID',
        });
        users.hasMany(models.documents, {
          foreignKey: 'userID',
          onDelete: 'CASCADE',
        });
      },
    },
    instanceMethods: {
      encryptPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
      },
      validate(password) {
        return bcrypt.compareSync(password, this.password);
      },
    },
    hooks: {
      beforeCreate(user) {
        user.encryptPassword();
      },
      beforeUpdate(user) {
        if (user.password) {
          user.encryptPassword();
        }
      },
    },
  });
  return users;
};
