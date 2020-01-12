// A l'image du middlaware de verification d'un utilisateur, on peut en créer un nouveau charger de vérifier si l'utilisateur un est un admin
const adminMiddleware = (request, response, next) => {

    if(!request.session.user){
        // Si l'utilisateur n'est pas du tout connu on redirige vers la page de login
        return response.redirect('/login');
    }

    if(request.session.user.role === 'admin'){
        // Si l'utilisateur est connu et est un admin alors on redonne la main au middlware suivant
        // Dans notre exemple la methode adminPage du controller adminController
        next();
    }else{
        return response.status(403).render('403');
    }

};

module.exports = adminMiddleware;