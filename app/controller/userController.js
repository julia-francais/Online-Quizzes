const emailValidator = require('email-validator');
const User = require('../model/user');
const bcrypt = require('bcrypt');

const userController = {

    signupPage: (request, response) => {
        response.render('signup');
    },

    loginPage: (request, response) => {
        response.render('login');
    },

    signupAction: (request, response) => {
        // On vérifie que tout les champs sont rempli
        for (let field in request.body) {
            if (request.body[field] === '') {
                return response.render('signup', { error: `Le champ ${field} est obligatoire.` });
            }
        }

        // On vérifie que l'email a un format valide
        if (!emailValidator.validate(request.body.email)) {
            return response.render('signup', { error: "Cet email n'est pas valide" });
        }

        // On vérifie que les 2 champs de mot de passe correspondent
        if (request.body.password !== request.body.passwordConfirm) {
            return response.render('signup', { error: "La confirmation de votre mot de passe a échoué" });
        }

        // Afin de stocker mon mot de passe en toute sécurité je l'encryp en le hashant avec le modul bcrypt, c'est la valeur retourné que je pourrais stocker en base de données
        const encryptedPassword = bcrypt.hashSync(
            request.body.password,
            // Ce paramètre va haché 10 fois le mot de passe avec un salt différent à chaque fois
            10
        );

        User.findOrCreate({
            where: {
                email: request.body.email
            },
            defaults: {
                firstname: request.body.firstname,
                lastname: request.body.lastname,
                password: encryptedPassword,
                // Le status est utile dans le cas ou l'on veuille desactivé temporairement un utilisteur
                // De manière général il est utile pour ne pas récuperer un/des élément(s) en particulier
                status: 1
                // Ici on ne défini pas le role de l'utilisateur
                // Car le champ à par défaut comme valeur "user"
                // Et on ne peut pas s'inscrire en tant qu'admin
            }
        }).then(([user, created]) => {
            console.log(user, created);
            // Notation un peu particulière
            // [elem1, elem2] car findOrCreate nous renvoi un tablea a 2 éléments, et on vbeut stocker ces 2 élément directement dans 2 variables

            // Une fois que l'utilisateur est bien enregistré on redirige vers la page de login
            if (!created) {
                response.render('signup', { error: "Compte déjà existant" });
            } else {
                return response.redirect('/login');
            }
        });

    },

    loginAction: (request, response) => {

        User.findOne({
            where: {
                email: request.body.email
            }
        }).then(user => {
            if (!user) {
                return response.render('login', { error: "Cet email n'existe pas" });
            }

            const passwordExpected = user.getPassword();
            // afin de vérfier si le mot de passe est valide on utilise la méthode compare(Sync) du module bcrypt
            const validPassword = bcrypt.compareSync(request.body.password, passwordExpected);

            if (!validPassword) {
                return response.render('login', { error: "Ce n'est pas le bon mot de passe" });
            }

            // On peut maintenant loguer l'utilisateur
            // La session est stocké dans l'objet de requête
            request.session.user = user;
            // Par contre on veut pas stocker le mot de passe
            delete request.session.user.password;
            // Une fois l'utilisateur logué on peut le rediriger vers la page d'accueil
            return response.redirect('/');
        })

    }

};

module.exports = userController;