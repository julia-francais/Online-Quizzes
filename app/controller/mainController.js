const Quizz = require('../model/quizz');
const Tag = require('../model/tag');

const mainController = {

    homePage: async (request, response) => {
        // Afin de récupoérer les données venant de la base de données nous avons besoin d'utiliser un ou plusieurs model
        // Pour cela ne pas oublié d'inclure ce model afin qu'il soit accessible
        //On nous demande de récupérer l'ensemble des quizz AVEC leur auteur
        /*Quizz.findAll({include: ["author"]})
        .then((quizzes) => {
            // si on ne sait pas a quoi ressemble notre variables
            // on a le reflexe de faire un console.log
            //console.log(quizzes);
            //en retour de la méthode sequelize de notre model on récupère la liste des instances de notre model
            // On se retrouve donc avec un tableau array
            // Afin de pouvoir exploité ce tableau dans notre vue ejs
            // Il fault le lui renvoyer dans le render
            response.render('accueil', {quizzes: quizzes});
        });*/

        //Avec la nouvelle manière d'implementer un appel a une methode du model etendu sequelize avec le promesse
        // tout devient plus simple et plus logique
        try {
            // Avec await je lui demande d'attendre la réponde de la méthode findAll avant de faire le rendu de la vue
            const quizzes = await Quizz.findAll({ include: "author" });
            //const tags = await Tag.findAll();
            response.render('accueil', { quizzes: quizzes/*, tags: tags */});
        } catch (error) {
            // On ajoute le status 500 qui correspond a une erreur serveur avant d'envoyer l'erreur sur la page du navigateur
            response.status(500).send(error);
        }

    }

};

module.exports = mainController;