'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Question, {foreignKey: 'user_id'})
        User.hasMany(models.Answer, {foreignKey: 'userId'})
        User.hasMany(models.Vote, {foreignKey: 'userId'})
      }
    }
  });
  return User;
};
