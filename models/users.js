'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    twitter_id: DataTypes.STRING,
    display_name: DataTypes.STRING,
    screen_name: DataTypes.STRING,
    icon_url: DataTypes.STRING,
    provider: DataTypes.STRING,
  }, {
    underscored: true,
  });
  users.associate = function(models) {
      users.hasOne(models.user_privates);
  };
  return users;
};
