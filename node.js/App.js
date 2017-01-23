//https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// CONFIGURE MONGODB
// Load mongoose packagex`
var mongoose = require('mongoose');

// Connect to MongoDB and create/use database called todoAppTest
mongoose.Promise = global.Promise; //http://stackoverflow.com/questions/38138445/node3341-deprecationwarning-mongoose-mpromise
mongoose.connect('mongodb://localhost/littlegeorge');
var Mug = require('./app/models/mug');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our little george api!' });   
});

// more routes for our API will happen here
// on routes that end in /mugs
// ----------------------------------------------------
router.route('/mugs')

    // create a mug (accessed at POST http://localhost:8080/api/mugs)
    .post(function(req, res) {
        
        var mug = new Mug();      // create a new instance of the Mug model
        mug.user_id = req.body.user_id;  // set the mugs name (comes from the request)

        // save the mug and check for errors
        mug.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Mug created!' });
        });
        
    })

    // get all the mugs (accessed at GET http://localhost:8080/api/mugs)
    .get(function(req, res) {
        Mug.find(function(err, mugs) {
            if (err)
                res.send(err);

            res.json(mugs);
        });
    });

// on routes that end in /mugs/:mug_id
// ----------------------------------------------------
router.route('/mugs/:mug_id')


    // get the mug with that id (accessed at GET http://localhost:8080/api/mugs/:mug_id)
    .get(function(req, res) {
        Mug.findById(req.params.mug_id, function(err, mug) {
            if (err)
                res.send(err);
            res.json(mug);
        });
    })

    // update the mug with this id (accessed at PUT http://localhost:8080/api/mugs/:mug_id)
    .put(function(req, res) {

        // use our mug model to find the mug we want
        Mug.findById(req.params.mug_id, function(err, mug) {

            if (err)
                res.send(err);

            mug.user_id = req.body.user_id;  // update the mugs info

            // save the mug
            mug.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'mug updated!' });
            });

        });
    })

    // delete the mug with this id (accessed at DELETE http://localhost:8080/api/mugs/:mug_id)
    .delete(function(req, res) {
       Mug.remove({
            _id: req.params.mug_id
        }, function(err, mug) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);