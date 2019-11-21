const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
module.exports = new Sequelize('codegig', 'root', 'gigiWP123', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  },
});
