const sequelize = require('sequelize');
const DBConnection = require('../dbConnection');

class Answer extends sequelize.Model {

    getDescription(){
        return this.description;
    };

    setDescription(value){
        if(typeof value !== 'string'){
            throw Error('Answer.description must be a string!');
        }
        this.description = value;
    };

    getQuestionId(){
        return this.question_id;
    };

    setQuestionId(value){
        if(!Number.isInteger(value)){
            throw Error('Answer.question_id must be an integer');
        }
        this.question_id = value;
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

Answer.init(
    {
        // Cas particulier pour les champs/colonnes qui sont chargé de faire la liaison entre 2 tables : ils ne doivent pas être déclarés ici
        // Ils le seront automatiquement une fois la liaison déclaré entre les 2 tables, la nomenclature sera toujours : <table>_id
        description: sequelize.TEXT,
        status: sequelize.INTEGER
    },
    {
        sequelize: DBConnection,
        tableName: "answers",
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
);

module.exports = Answer;