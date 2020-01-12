// premier reflexe : les variables d'environnement
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;

// Ensuite express
const express = require('express');
const app = express();

// réglage des views
app.set('views', 'app/views');
app.set('view engine', 'ejs');

// les statiques
app.use(express.static('public'));

// Gestionnaire de session
const session = require('express-session');
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: "Mon super genial mot de passe pôur encrypté mes sessions parce que c'est super chouette de faire ça, vous trouvez pas ?"
}));

// On ajoute un middleware afin de pouvoir résupérer les informations d'un utilisateur sur toutes les pages de notre application
const userMiddleware = require('./app/middlewares/user');
app.use(userMiddleware);

// Routage
const router = require('./app/router');
app.use(router);

// lancement du serveur
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});