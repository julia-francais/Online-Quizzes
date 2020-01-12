const sequelize = require('sequelize');
const DBConnection = require('../dbConnection');

class Tag extends sequelize.Model {

    getId(){
        return this.id;
    }

    getName() {
        return this.name;
    };

    setName(value) {
        if (typeof value !== 'string') {
            throw Error('Question.name must be a string!');
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

Tag.init(
    {
        name: sequelize.STRING,
        status: sequelize.INTEGER
    },
    {
        sequelize: DBConnection,
        tableName: "tags",
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
  );

module.exports = Tag;