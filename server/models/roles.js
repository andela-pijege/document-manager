'use strict';
module.exports = function(sequelize, DataTypes) {
  var roles = sequelize.define('roles', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: ['^[a-z]+$', 'i'],
          msg: 'title can only contain letters'
        },
        notEmpty: {
          msg: 'title field cannot be empty'
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        roles.hasMany(models.users, {
          foreignKey: 'roleID',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return roles;
};