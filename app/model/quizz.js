const sequelize = require('sequelize');
const DBConnection = require('../dbConnection');

// On impporte toutes les classes qui seront bécessaire a déféinir nos relations
const User = require('./user');
const Question = require('./question');
const Tag = require('./tag');

class Quizz extends sequelize.Model {

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  };

  setTitle(value) {
    if (typeof value !== "string") {
      throw Error('Quizz.title must ba a string');
    } else {
      this.title = value;
    }
  };


  getDescription() {
    return this.description;
  };

  setDescription(value) {
    if (typeof value !== "string") {
      throw Error('Quizz.description must ba a string');
    } else {
      this.description = value;
    }
  };

  getAuthor() {
    //On peut ici récupérer notre autheur grâce à la potentielle instance de class de author
    // /!\ qi aucune instance de classe de author n'est présente dans l'instance de classe de Quizz cela va générer une erreur
    // Du coup il va falloir que je rajoute un test pour vérifier que j'ai bien une instance author
    if (typeof this.author !== 'undefined') {
      return this.author.getFullName();
    }
  }

  getAppUsersId() {
    return this.app_users_id;
  };

  setAppUsersId(value) {
    if (!Number.isInteger(value)) {
      throw Error('Quizz.app_users_id must be an integer');
    } else {
      this.app_users_id = value;
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

Quizz.init(
  {
    title: sequelize.STRING,
    description: sequelize.TEXT,
    status: sequelize.INTEGER
  },
  {
    sequelize: DBConnection,
    tableName: "quizzes",
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

//Relation avec users

Quizz.belongsTo(User, {
  foreignKey: "app_users_id",
  as: "author"
});

User.hasMany(Quizz, {
  foreignKey: "app_users_id",
  as: "quizzes"
});

//Relation avec les questions

/*
belongsTo
Je.appartient(atoi, par le lien de l'amour)

hasMany
toi.tuas(eux, par le lien de l'amour)
*/

Quizz.hasMany(Question, {
  foreignKey: "quizzes_id",
  as: "questions"
});

Question.belongsTo(Quizz, {
  foreignKey: "quizzes_id",
  as: "quizz"
});

// Relatyions avec les tags.
// Plus compliqué N:N

Quizz.belongsToMany(Tag, {
  as: "tags",
  // Lorsque l'on veut créer une relation N:N il faut spécifier la table qui servira a relié les 2 entité
  through: "quizzes_has_tags",
  // Pour ce type de relation il faut égalkement spécifier 2 champs/collones qui correpondeent chacun a l'id des 2 tables
  // /!\ la foreignKey doit faire référence au model concerné
  foreignKey: "quizzes_id",
  // Et le otherKey fait référence a l'autre model
  otherKey: "tags_id",
  // Ici on ne veut pas récupérer les timestamp (created_at, updated_at)
  timestamps: false
});

// reciproque
Tag.belongsToMany(Quizz, {
  as: "quizzes",
  through: "quizzes_has_tags",
  foreignKey: "tags_id",
  otherKey: "quizzes_id",
  timestamps: false
})

module.exports = Quizz;