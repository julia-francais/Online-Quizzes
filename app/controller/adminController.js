const Tag = require('../model/tag');


const adminController = {

    adminPage: (request, response) => {
        // Solution non viable sur le long terme car il faudrait faire ce test sur tout les controller et method restreintes a un admin
        if(request.session.user.role !== 'admin'){
            response.redirect('/');
        }
        response.render('admin');
    },

    addNewTag: (request, response) => {
        if(request.session.user.role === 'admin'){
            response.render('newtag', { error: " "});
        }else{
            response.redirect('/login')
        }
    },

    addNewTagInDatabase: async(request, response) => {
        console.log(request.body.tag)
        try {
                if (request.body.tag === '') {
                    return response.render('newtag', { formData: request.body, error: `La nouvelle categorie de quizz que vous souhaitez ajouter est vide.` });
                }

                const [tag, created] = await Tag.findOrCreate({
                    where: {
                        name: request.body.tag
                    }
                });
                console.log('findorcreateapres');

                if (!created) {
                    console.log("deja");
                    response.render('newtag', {error: "Cette categorie existe deja"});
                } else {
                    return response.render('newtag', {error: `La categorie ${request.body.tag} a bien ete creee`});
                }
        } catch (error) {
            response.status(500).send(error);
        }

    }

};

module.exports = adminController;