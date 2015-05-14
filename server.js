// require the path module
var path = require("path");
// require express and create the express app
var express = require("express");
var app = express();
// require bodyParser since we need to handle post data for adding a user
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/basic_mongoose');

app.use(bodyParser.urlencoded());
// static content
app.use(express.static(path.join(__dirname, "./static")));
// set the views folder and set up ejs
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var UserSchema = new mongoose.Schema({
    name: String,
    age: Number
})
var User = mongoose.model('User', UserSchema);

// root route
app.get('/', function(req, res) {
 // This is where we would get the users from the database and send them to the index view to be displayed.
    res.render('index');
})
// route to add a user
app.post('/users', function(req, res) {
    console.log("POST DATA", req.body);
    // create a new User with the name and age corresponding to those from req.body
    var user = new User({name: req.body.name, age: req.body.age});
    user.save(function(err){
        if(err){
            console.log('something went wrong');
        } else{
            console.log('successfully added a user!');
        }
    });
    res.redirect('/');
})
// listen on 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})