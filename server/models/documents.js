'use strict';
module.exports = function(sequelize, DataTypes) {
  var documents = sequelize.define('documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 50],
          msg: 'title cannot be less than 2 or greater than 50 characters'
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        documents.belongsTo(models.users, {
          foreignKey: 'userID',
        });
        // associations can be defined here
      }
    }
  });
  return documents;
};