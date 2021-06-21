'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    userId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.NUMERIC,
    lng: DataTypes.NUMERIC,
    spotName: DataTypes.STRING,
    price: DataTypes.NUMERIC
  }, {});
  Spot.associate = function(models) {
    // associations can be defined here
    Spot.belongsTo(models.Booking, { foreignKey: 'spotId' });
    Spot.hasMany(models.Image, { foreignKey: 'spotId'});
  };
  return Spot;
};
