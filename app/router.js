const mainController = require('./controller/mainController');
const quizzController = require('./controller/quizzController');
const tagController = require('./controller/tagController');
const express = require('express');

const router = express.Router();

router.get('/', mainController.homePage);
router.get('/quizz/:id', quizzController.quizzPage);
router.get('/tags', tagController.tagListPage);
// Cas de récupération de tag par name
//router.get('/tag/:name', tagController.tagPage);
router.get('/tag/:id', tagController.tagPage);

module.exports = router;