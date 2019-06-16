'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_privates = sequelize.define('user_privates', {
    user_id: DataTypes.INTEGER,
    twitter_access_token: DataTypes.STRING,
    twitter_access_secret: DataTypes.STRING,
    token: DataTypes.STRING,
  }, {
    underscored: true,
  });
  user_privates.associate = function(models) {
      user_privates.belongsTo(models.users);
  };
  return user_privates;
};
