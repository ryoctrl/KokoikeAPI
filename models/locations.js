'use strict';
module.exports = (sequelize, DataTypes) => {
  const locations = sequelize.define('locations', {
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    comments: DataTypes.STRING,
    address: DataTypes.STRING,
    url: DataTypes.STRING,
    tel: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lon: DataTypes.FLOAT,
    image_url: DataTypes.STRING
  }, {
    underscored: true,
  });
  locations.associate = function(models) {
      locations.belongsTo(models.users);
  };
  return locations;
};
