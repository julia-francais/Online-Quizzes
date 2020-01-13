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
            response.render('newtag');
        }else{
            response.redirect('/login')
        }
    },

    addNewTagInDatabase: (request, response) => {
        console.log(request.body.tag)
    }

};

module.exports = adminController;