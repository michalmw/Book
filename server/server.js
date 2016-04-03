var express = require('express');
var morgan = require('morgan');
var multer = require('multer');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var secret = require('./config/secret');
var MongoBook = require('connect-mongo/es5')(session);
var passport = require('passport');
var flash = require('express-flash');
var path = require('path');
var app = express();

//database
mongoose.connect(secret.database, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connect');
    }
});



// Model
var Book = require('./model/book');
var Publishinghouse = require('./model/publishinghouse');
var Series = require('./model/series');
var Releasecycle = require('./model/releasecycle');
var Category = require('./model/category');
var Author = require('./model/author');
var User = require('./model/user');



app.use(express.static(__dirname + '/../app'));
app.use(express.static(path.join(__dirname, 'app')));
app.set('views', __dirname + '/../app/');
app.set('view engine', 'html');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,    
    secret: secret.secretKey,
    book: new MongoBook({ url: secret.database, autoReconenect: true})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//router
var authorRoute = require('./route/author');

app.use('/api', authorRoute);






app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://192.168.1.2:9000");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Origin,__setXHR_");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST,OPTIONS');
    res.header('Access-Control-Allow-Credentials', "true");
    next();
});


// //img
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, '../app/img/author/')
    },
    filename: function (req, file, cb) {
        // var datetimestamp = Date.now();
        console.log('file:::' + file.fieldname);
        console.log('fileee:::' + file.originalname);
        cb(null, file.originalname);
    }
});
var upload = multer({storage: storage}).single('file');
//book

app
    .post('/api/admin/category', function(req,res) {
        console.log('odbierasz:', req.body);
        var category = new Category();
        category.name = req.body.name;

        category.subcategory = req.body.subcategory;
        category.save(function (err) {

            if (err) return console.log(err);
            res.json('Poprawnioe dodano ;-)');

        });
    })
    .get('/api/admin/category', function(req,res) {
        Category.find(function (err, cat) {
            if (err) res.json('error:' + err);

         res.json(cat);
        });
    });

var UsersRouter = require('./route/user');
app.use('/api/', UsersRouter);


//publishinghouse
app
    .get('/api/publishinghouses', function(req, res) {
        Publishinghouse.find(function(err, publishing) {
            if (err) res.json('error:' + err);

            res.json(publishing);
        });
    })
    .delete('/api/publishinghouse/:id', function(req, res) {
        Publishinghouse.findByIdAndRemove(req.params.id, req.body, function (err, publishinghouse) {
            if (err) return next(err);
            res.json(publishinghouse);
        });
    })
    .post('/api/publish', function(req, res) {

        // res.json('test');
        var publishinghouse = new Publishinghouse();

        publishinghouse.name = req.body.name;

        publishinghouse.save(function(err) {
            if(err) return res.json('err:' + err);

            res.json('yea ;-)');
        });
    });



app
    .get('/api/books', function(req,res) {

    })
    .post('/api/book', function (req, res) {
     
        var book  = new Book();

            // var slider = new Slider();
            // slider.namePl = req.body.slider.namePl;
            // slider.nameEn = req.body.slider.nameEn;
            // slider.descriptionPl = req.body.slider.descriptionPl;
            // slider.descriptionEn = req.body.slider.descriptionEn;
            // slider.img = req.file.path;
            // slider.save();
            // res.json({ error_code: 0, err_desc: null });

});




/////////////////////////////////////crud slider////////////////////////// 
// dodaj im slidera


app.get('/api/subs', function (req, res, next) {
    Sub.find(function (err, sub) {
        if (err) res.json('error:' + err);

        res.json(sub);
    });
});


app.get('/api/sub/:id', function (req, res) {

    var id = req.params.id;

    Sub.findOne({ _id: id }, function (err, sub) {
        res.json(sub);
    });
});
//usuwanie sub
app.delete('/api/subD/:id', function (req, res, next) {
    Sub.findByIdAndRemove(req.params.id, req.body, function (err, sub) {
        if (err) return next(err);
        res.json(sub);
    });
});
// update sub
app.put('/api/subU/:id', function (req, res, next) {
    Sub.findByIdAndUpdate(req.params.id, req.body, function (err, sub) {
        if (err) return next(err);
        res.json(sub);
    });
});
///////////////////////////////////////////////////////////////////////////////////
app
    .get('/', function(req,res,next) {
        // res.json('woow ;-) Server');
        res.render('index');
    })
    .get('*', function(req,res,next) {
        res.render('index');

    })


app.listen(secret.port, function (err) {

    if (err) throw err;
    console.log('Server running on port '+ secret.port);

});
