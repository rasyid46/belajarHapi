'use strict';
module.exports = (sequelize, DataTypes) => {
  var validator = require('validator');

  var Users = sequelize.define('Users', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: ["^[a-z]+$", "i"],
          msg: "Allow only letter"
        },
        len: {
          args: 3,
          msg: "First Name must be atleast 3 characters in length"
        },
      }
    },
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: {
          args: [6, 128],
          msg: "Email address must be between 6 and 128 characters in length"
        },
        isEmail: {
          args: true,
          msg: "Email address must be valid"
        }
      }
    },
    password: DataTypes.STRING
  }, {});

   
 
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};