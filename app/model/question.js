const sequelize = require('sequelize');
const DBConnection = require('../dbConnection');

// Afin de relié les questions à ses réponses nous avons besoin du model Answer
const Answer = require('./answer');
const Level = require('./level');

class Question extends sequelize.Model {

  getQuestion() {
    return this.question;
  };

  setQuestion(value) {
    if(typeof value !== "string") {
      throw Error('Question.question must be a string');
    } else {
      this.question = value;
    }
  };

  getAnecdote() {
    return this.anecdote;
  };

  setAnecdote(value) {
    if (typeof value !== "string") {
      throw Error('Question.anecdote must be a string');
    } else {
      this.anecdote = value;
    }
  };

  getWiki() {
    return this.wiki;
  };

  setWiki(value) {
    if (typeof value !== "string") {
      throw Error('Question.wiki must be a string');
    } else {
      this.wiki = value;
    }
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

};

Question.init(
  {
      question: sequelize.TEXT,
      anecdote: sequelize.TEXT,
      wiki: sequelize.TEXT,
      status: sequelize.INTEGER
  },
  {
      sequelize: DBConnection,
      tableName: "questions",
      createdAt: "created_at",
      updatedAt: "updated_at"
  }
);

//Question.hasMany(Answer);
// On déclare la relation (1:N) entre question et answer grâce à la méthode hasMany
// Une question à plusieurs réponses
Question.hasMany(Answer, {
  // En premier paramètre d'option on défini le champs qui sert a relié les 2 tables. C'est le champ question_id dans la table Answer qui permet de relié les 2
  foreignKey: "questions_id",
  // On défini un alias de liaison
  // il sera utiler dans le findBy... ou findAll... dans le'option "include"
  as: "answers"
});
//Answer.belongsTo(Question);
// Réciproque obligatoire lors de la configuration d'une relation entre 2 tables
//Une réponse n'a q'une seule question
Answer.belongsTo(Question, {
  foreignKey: "questions_id",
  as: "questions"
});

// Ici cas particulier dans la table question il existe un champ answers_id qui défini la bonne réponse à la question
// On redéfini donc une nouvelle relation entre les tables
// mais celle-ci se fait sur le champ answers_id au lieu de questions_id
Question.belongsTo(Answer, {
  foreignKey: "answers_id",
  as: "good_answer"
});

// On associe maintenant les "levels" au questions
Question.belongsTo(Level, {
  foreignKey: "levels_id",
  as: "levels"
});

//Reciproque
Level.hasMany(Question, {
  foreignKey: "levels_id",
  as: "questions"
});

// on exporte la class directement !
module.exports = Question;