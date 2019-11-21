'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gig = sequelize.define('Gig', {
    title: DataTypes.STRING,
    technologies: DataTypes.STRING,
    description: DataTypes.STRING,
    budget: DataTypes.FLOAT,
    contact_email: DataTypes.STRING
  }, {});
  Gig.associate = function(models) {
    // associations can be defined here
  };
  return Gig;
};