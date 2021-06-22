'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    userId: DataTypes.INTEGER,
    addressLine1: DataTypes.STRING(50),
    addressLine2: DataTypes.STRING(30),
    addressLine3: DataTypes.STRING(30),
    addressLine4: DataTypes.STRING(30),
    lat: DataTypes.DOUBLE(5,20),
    lng: DataTypes.DOUBLE(5,20),
    spotName: DataTypes.STRING,
    price: DataTypes.DECIMAL(5,2)
  }, {});
  Spot.associate = function(models) {
    // associations can be defined here
    Spot.hasMany(models.Booking, { foreignKey: 'spotId' });
    Spot.hasMany(models.Image, { foreignKey: 'spotId'});
    Spot.hasMany(models.Review, { foreignKey: 'spotId' });
  };
  return Spot;
};
