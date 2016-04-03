var router = require('express').Router();
var Author = require('../model/author');

router
    .get('/authors', function(req,res) {
        Author.find(function(err, authors) {
            if (err) res.json('error:' + err);

            res.json(authors);
        })
    })
    .post('/author',  function(req, res) {

        upload(req, res, function (err) {

            if (err) return console.log('err:', err);
           
            console.log('all', req.body);
            var author = new Author;
            author.url = req.file.originalname;
            author.name = req.body.author.name;
            author.photo = '';
            author.nick = req.body.author.nick;
            author.about = req.body.author.about;
            author.category = req.body.author.category;
            author.save(function(err) {

                if (err) return console.log(err);
                res.json('Poprawnioe dodano ;-)');

            });
        });
    })
    .delete('/author/:id', function(req, res) {
        Author.findByIdAndRemove(req.params.id, req.body, function (err, author) {
            if (err) return next(err);
            res.json(author);
        });
    });

module.exports = router;
