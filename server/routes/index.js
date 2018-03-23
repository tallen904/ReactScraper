const express = require('express');
const router = express.Router();

const controller = require('../controllers')

router.get('/scrape', controller.scrape);

router.get('/articles', controller.getArticles);

router.get('/articles/:id', controller.getArticle);

router.get('/notes', controller.getNotes);

router.get('/notes/:id', controller.getNote)

router.delete('/notes/:id', controller.deleteNote)

router.post('/articles/:id', controller.updateArticle);

module.exports = router