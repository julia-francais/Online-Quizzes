// on importe sequelize
// /!\ sequelize a besoin du module pg, mais nous n'avons pas besoin de l'importer
// Le module sequelize n'est pas dépendant de PG car on peut choisir d'utiliser un autre type de base de données
const sequelize = require('sequelize');
// On crée notre connection grâce a celui-ci
const DBConnection = new sequelize.Sequelize(process.env.PG_URL);
// on export notre connection (une instance qui a été créée a partir de la class Sequelize du module sequelize)
module.exports = DBConnection;