const cheerio = require('cheerio');
const axios = require('axios');
const db = require('../models/')

module.exports = {
    scrape: (req, res) => {
        axios.get("https://www.reddit.com/").then(response => {
            const $ = cheerio.load(response.data);

            $('p.title').each((i, element) => {
                var result = {}

                result.title = $(element)
                .text()
                result.link = $(element)
                .children().attr('href');

                db.Article.create(result)
                    .then(dbArticle => console.log(dbArticle))
                    .catch(err => res.json(err))
            })

            res.send('Scrape completed!')
        })
    },
    getArticles: (req, res) => {
        db.Article.find({})
            .limit(20)
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.json(err))
    },
    getArticle: (req, res) => {
        db.Article.find({_id: req.params.id})
            .populate('notes')
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.json(err))
    },
    updateArticle: (req, res) => {
        console.log(req.params.id);
        db.Note.create(req.body)
            .then(dbNote =>  {
                console.log(dbNote)
                return db.Article.findOneAndUpdate({ _id: req.params.id }, {$push: { notes: dbNote._id } })})
                .then(dbUser => {
                    console.log(dbUser)
                    res.json(dbUser);
                })
    },
    deleteNote: (req, res) => {
        db.Note.findOneAndRemove({_id: req.params.id}, err => {
            if(err) throw err
            console.log('Deleted comment!')
        })
    },
    getNotes: (req, res) => {
        db.Note.find({})
            .then(dbNote => res.json(dbNote))
    },
    getNote: (req, res) => {
        db.Note.find({_id: req.params.id})
            .then(dbNote => res.json(dbNote))
    }
}

// Contact.findByIdAndUpdate(
//   info._id,
//   { $push: { messages: { title: title, msg: msg } } },
//   { safe: true, upsert: true },
//   function(err, model) {
//     console.log(err);
//   }
// );