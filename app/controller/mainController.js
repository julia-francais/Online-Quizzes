const Quizz = require('../model/quizz');

const mainController = {

    homePage: (request, response) => {
        // Afin de récupoérer les données venant de la base de données nous avons besoin d'utiliser un ou plusieurs model
        // Pour cela ne pas oublié d'inclure ce model afin qu'il soit accessible
        //On nous demande de récupérer l'ensemble des quizz AVEC leur auteur
        Quizz.findAll({include: ["author"]}).then((quizzes) => {
            // si on ne sait pas a quoi ressemble notre variables
            // on a le reflexe de faire un console.log
            //console.log(quizzes);
            //en retour de la méthode sequelize de notre model on récupère la liste des instances de notre model
            // On se retrouve donc avec un tableau array
            // Afin de pouvoir exploité ce tableau dans notre vue ejs
            // Il fault le lui renvoyer dans le render
            response.render('accueil', {quizzes: quizzes});
        });
    }

};

module.exports = mainController;