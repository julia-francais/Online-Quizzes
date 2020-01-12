const Quizz = require('../model/quizz');

const quizzController = {

    quizzPage: async (request, response) => {
        // On a notre id de quizz
        const quizzId = parseInt(request.params.id);
        // maintenant on veut récupérer les infos du quizz qui correspondent a cet id
        /*Quizz.findByPk(quizzId,{
            // Afin de pouvoir utiliser une autre relation a travers une première relation
            // ici : level qui est relié a question qui lui même est relié a quizz
            // On peut décomposer un élément du tableau include en objet
            // ici : "author" devient "{association: "author"}"
            // les 2 expressions veulent dire exactement la même chose
            // Mais cela nous permet d'ajouter une nouvelle clé "include" afin de récupérer les levels des questions

            
            // # Version simple permattent de relié 2 model directement relié a Quizz
            // include : [
            //     "author",
            //     "questions",
            //     "tags"
            // ]
            

            // # Version plus complexe permettant de récupérer "levels" qui lui n'est pas directement relié a "Quizz" mais a "questions"
            include :[
                { association: "author"},
                { association: "questions", include: ["levels"]},
                { association: "tags"}
            ]
        }).then((quizz) => {
            //console.log(quizz.tags);
            response.render('quizz', {quizz: quizz});
        });*/
        try {
            const quizz = await Quizz.findByPk(quizzId, {
                include: [
                    { association: "author" },
                    { association: "questions", include: ["answers", "levels"] },
                    { association: "tags" }
                ]
            });
            response.render('quizz', { quizz: quizz });
        } catch (error) {
            response.status(500).send(error);
        }

    }

};

module.exports = quizzController;