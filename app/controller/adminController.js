const adminController = {

    adminPage: (request, response) => {
        // Solution non viable sur le long terme car il faudrait faire ce test sur tout les controller et method restreintes a un admin
        if(request.session.user.role !== 'admin'){
            response.redirect('/');
        }
        response.render('admin');
    },

    adminPage2: (request, response) => {

    }

};

module.exports = adminController;