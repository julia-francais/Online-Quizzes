const mainController = require('./controller/mainController');
const quizzController = require('./controller/quizzController');
const tagController = require('./controller/tagController');
const userController = require('./controller/userController');
const adminController = require('./controller/adminController');

//Importation de notre middleWare de verification admin
const adminMiddleware = require('./middlewares/admin');

const express = require('express');

const router = express.Router();

// J'ajoute un middleware me permettant de récupérer les information envoyer par formulaire de methode post
router.use(express.urlencoded({ extended: true }));

// Page d'accueil
router.get('/', mainController.homePage);

// Page affichant un quizz
router.get('/quizz/:id', quizzController.quizzPage);

// Page listant les catégories
router.get('/tags', tagController.tagListPage);

// Page listant les quizz appartenant a une catégorie
// Cas de récupération de tag par name
//router.get('/tag/:name', tagController.tagPage);
router.get('/tag/:id', tagController.tagPage);

// Page d'inscription
router.get('/signup', userController.signupPage);

// Page qui réceptionne les informations d'inscription
router.post('/signup', userController.signupAction);

// Page de login
router.get('/login', userController.loginPage);

// Page qui réceptionne les informations de login
router.post('/login', userController.loginAction);

//Page accessible uniquement par un user ayant le rôle admin
// Désormais la route /admin utilise 2 middleware, il va les exécuter dans l'ordre, le premier est chargé de vérifier sur l'utilisateur est bien un admin, si c'est le cas grâce a next() le middleware suivant sera exécuté
router.get('/admin', adminMiddleware, adminController.adminPage);
// L'intéret de créer un middleware indépendant pour gérer l'accès admin, c'est qu'on pourrais l'utiliser facilement sur une autre route

module.exports = router;