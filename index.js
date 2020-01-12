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

// Routage
const router = require('./app/router');
app.use(router);

// lancement du serveur
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});