
const mongoose = require('mongoose');

// connect from mongodb
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
mongoose.connect('mongodb+srv://admin:admin@mongo.h9vbr7w.mongodb.net/Review-System?retryWrites=true&w=majority', options);

// aquire connection if it is succesful
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'error connecting to db'));

// up and running then print the message
db.once('open', function(){
    console.log("successfully connected to database!");
});

module.exports = db;