/**
 * @module models/user
 * @file User Sequelize Model definition.
 */

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^[a-z]+$/i,
        min: 3,
        max: 24
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 8
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    }
  });

  /* eslint-disable no-param-reassign */
  User.hook('beforeSave', async user => {
    if (user.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);

      user.password = hash;
    }
  });
  /* eslint-enable no-param-reassign */

  User.associate = ({ Task }) => {
    User.hasMany(Task);
  };

  return User;
};
