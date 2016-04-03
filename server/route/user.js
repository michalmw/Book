var router = require('express').Router();
var User = require('../model/user');
var passport = require('passport');
var passportConf = require('../config/passport');


router
    .post('/signup', function(req,res) {

        var user = new User();

        user.email = req.body.email;
        user.password = req.body.password;

        User.findOne({ email: req.body.email }, function(err, existingUser) {

        	if(existingUser)
        		res.json('taki mail istnieje');
        	else {

        		user.save(function(err) {
		            if (err) return res.json('error: '+ error);
		            res.json('ok');
		        });

        	}
        });
        
    })
    .get('/users', function(req, res) {
        User.find(function(err, user) {
            if (err) res.json('error:' + err);
            res.json(user);
        });
    })

    .post('/profile', function(req, res, next) {
      User.findOne({ _id: req.body._id }, function(err, user) {
        if (err) return next(err);
        // res.json('profile');
        // res.json(user);
        res.status(300).send({ redirect:"/login"});
            // console.log(user);
            // res.json('test');

      });


    })
    .post('/login', function(req, res) {

        passport.authenticate('local-login', function(err, user, info) {
            if (err) { return req.json('error'); }
            if (!user) { return res.json('brak usera'); }
            req.logIn(user, function(err) {
              if (err) { return res.json('uuup'); }
              res.json({status: 'OK', name: user.email, id: user._id});
            });
          })(req, res);
    })
    .get('/login', function(req, res) {
        res.render('views/login');
    })
    .get('/logout', function(req, res, next) {
      req.logout();
      res.json('ok');
    })
    .get('/loggedin', function(req,res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });
   
module.exports = router;