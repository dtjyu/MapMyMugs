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
var Collection = require('./app/models/collection');

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
// on routes that end in /collections
// ----------------------------------------------------
router.route('/collections')

    // create a collection (accessed at POST http://localhost:8080/api/collections)
    .post(function(req, res) {
        
        var collection = new Collection();      // create a new instance of the Collection model
        collection.user_id = req.body.user_id;  // set the collections name (comes from the request)

        // save the collection and check for errors
        collection.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Mug created!' });
        });
        
    })

    // get all the collections (accessed at GET http://localhost:8080/api/collections)
    .get(function(req, res) {
        Collection.find(function(err, collections) {
            if (err)
                res.send(err);

            res.json(collections);
        });
    });

// on routes that end in /collections/:collection_id
// ----------------------------------------------------
router.route('/collections/:collection_id')


    // get the collection with that id (accessed at GET http://localhost:8080/api/collections/:collection_id)
    .get(function(req, res) {
        Collection.findById(req.params.collection_id, function(err, collection) {
            if (err)
                res.send(err);
            res.json(collection);
        });
    })

    // update the collection with this id (accessed at PUT http://localhost:8080/api/collections/:collection_id)
    .put(function(req, res) {

        // use our collection model to find the collection we want
        Collection.findById(req.params.collection_id, function(err, collection) {

            if (err)
                res.send(err);

            collection.user_id = req.body.user_id;  // update the collections info

            // save the collection
            collection.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'collection updated!' });
            });

        });
    })

    // delete the collection with this id (accessed at DELETE http://localhost:8080/api/collections/:collection_id)
    .delete(function(req, res) {
       Collection.remove({
            _id: req.params.collection_id
        }, function(err, collection) {
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