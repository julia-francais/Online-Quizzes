const dotenv = require('dotenv');
dotenv.config();

const sequelize = require('sequelize');

const Answer = require('./app/model/answer');
const Level = require('./app/model/level');
const Question = require('./app/model/question');
const Quizz = require('./app/model/quizz');
const Tag = require('./app/model/tag');
const User = require('./app/model/user');

// Grâce a sequelize on peut utiliser l'ensemble des méthodes standar (Active Record) ici findById s'appelle findByPk
//mais on peut utiliser également findAll, findOne, etc...
/*Question.findAll({
    where: {
        firstname: {
            [sequelize.Op.in]: ['Philippe','Chuck']
        }
    }
}).then((instances) => {
    for (let instance of instances) {
        console.log(instance.dataValues);
    }
});*/
/*
Level.findOrCreate({
    where: {
        name:'superdur'
    },
    defaults: {
        status: 1
    }
}).then(([level, created])=>{
    console.log(level);
    console.log(created);
});
*/

//Test de relation
/*Question.findByPk(1, {
    // Afin de récupérer également les informations des réponses aux question on demande à inclure l'alias de liaison
    include: ["answers", "good_answer"]
}).then(question => {
    console.log(question.dataValues);
});*/

//Relation questions levels
/*Question.findByPk(2, {
    include: ["levels"]
}).then(question => {
    console.log(question.dataValues.levels.dataValues);
});*/

//test de recupération de quizz
/*Quizz.findByPk(1, {
    include: ["tags"]
}).then(quizz => {
    console.log(quizz.dataValues);
});*/

//Récuperation de tag
/*Tag.findByPk(1, {
    include: ["quizzes"]
}).then(tag => {
    console.log(tag.dataValues);
});*/

Tag.findByPk(1, {
    // Ici afin de récupérer l'auteur qui n'est pas présent dans tag mais dans quizz
    // On est obligé passé a travers la relations tag/quizz
    // Afin de dire a sequelize de 'utiliser la relation quizz et récupérer ensuite l'auteur avec la relation author
    // On complexifie un peu l'include a joutant une profondeur de plus
    // Dans asssociation on ajoute la relation de transition
    include: [{
        association: "quizzes",
        include: ["author"]
    }]
}).then(tag => {
    let message = '';
    //Example de récupération de données
    for(let quizz of tag.quizzes){
        message += `${quizz.title}, écrit par ${quizz.author.getFullName()}\n`;
    }
    console.log(message);
});