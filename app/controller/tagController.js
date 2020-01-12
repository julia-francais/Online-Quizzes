const Tag = require('../model/tag');

const tagController = {

    tagListPage: (request, response) => {
        Tag.findAll().then(tags => {
            response.render('tagList', {tags: tags});
        });
    },

    tagPage: (request, response) => {
        // cas de récuperation par name
        //const tagName = request.params.id;
        const tagId = parseInt(request.params.id);
        // cas de récuperation par name
        //Tag.findOne({name: tagName}).then(...);
        Tag.findByPk(tagId, {
            include: ["quizzes"]
        }).then(tag => {
            response.render('tag', {tag: tag});
        })
    }

};

module.exports = tagController;