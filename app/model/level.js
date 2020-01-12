// On importe le module sequelize afin d'étendre notre modèle avec le "CoreModel" de sequelize
const sequelize = require('sequelize');

// On importe notre instance connecté afin de l'utilisé dans l'initialisation du model sequelize
const DBConnection = require('../dbConnection');

// On étend désormais notre model avec celui de sequelize et non plus avec notre CoreModel perso
class Level extends sequelize.Model {

    /**
     /!\ Afin de pouvoir utiliser sequelize il ne faut ni déclarer de propriétés, ni de contructeur.
     On les a donc supprimés

     Par contre on peut garder nos getter / setter
     */
    getName() {
        return this.name;
    };

    setName(value) {
        if (typeof value !== 'string') {
            throw Error('Level.name must be a string!');
        }
        this.name = value;
    };

    getStatus() {
        return this.status;
    };

    setStatus(value) {
        if (!Number.isInteger(value)) {
            throw Error('Level.status must be an integer');
        }
        this.status = value;
    };
}

// On a accès à la méthode init() car notre model Level étand sequelize.Model qui lui possède la méthode static init
// En premier argument on indique un objet contenant la structure de notre table

Level.init(
    // 1ere partie sert à déclarer les champs de la table
    // On peut ommettre les champs created_at, updated_at, et id qui sont ajouté par défaut par sequelize
    {
        // STRING : longueur du texte limité par exemple : 255 caractère max
        // TEXT : loingueur illimité
        name: sequelize.STRING,
        status: sequelize.INTEGER
    },
    // 2eme partie, sert a configurer la connection et l'accès aux données
    {
        sequelize: DBConnection,
        // Comme nos tables porte un nom différent de notre classe, il faut lui indiquer le nom de celle-ci
        tableName: "levels",
        // Nos champs de date se nomment également différemment de ceux par défaut défini dans sequelize, mais on peut les modifier ici
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
);

module.exports = Level;