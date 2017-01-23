// Load mongoose package
var mongoose = require('mongoose');

// Connect to MongoDB and create/use database called todoAppTest
mongoose.Promise = global.Promise; //http://stackoverflow.com/questions/38138445/node3341-deprecationwarning-mongoose-mpromise
mongoose.connect('mongodb://localhost/littlegeorge');

// Create a schema
var CollectionSchema = new mongoose.Schema({
  user_id: String,
  city: String,
  image_location: String,
  updated_at: { type: Date, default: Date.now },
});

// Create a model based on the schema
var Collection = mongoose.model('Collection', CollectionSchema);

// Create a todo in memory
var collection = new Collection({user_id: 'littlegeorge00', city: 'new york', image_location: 'Getting there...'});
// Save it to database
collection.save(function(err){
  if(err)
    console.log(err);
  else
    console.log(collection);
});

process.exit();