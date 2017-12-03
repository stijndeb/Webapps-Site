const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

require('./models/category');
require('./models/Comment');
require('./models/post');
require('./models/user');


//connect to database
mongoose.connect(config.database);

// on connection
mongoose.connection.on('connected', ()=> {
    console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', (err)=> {
    console.log('Database error' + err);
});


const app = express();

const users = require('./routes/users');
const posts = require('./routes/posts');
const categories = require('./routes/categories');

const port = process.env.PORT || 8080;
//const port = 3000;


// CORS middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'dist')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Body Parser Middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/', posts);
app.use('/users', users);
app.use('/posts', posts);
app.use('/categories', categories);

//index route
/*app.get('/', (req, res)=> {
    res.send('Invalid endpoints');
})*/

app.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public/index.html'));
    res.sendFile(path.join(__dirname, 'routes/posts/'));
    
});

app.all('*', (req, res) => { 
	const indexFile =`${path.join(__dirname, 'dist')}/index.html`; 
	res.status(200).sendFile(indexFile);
});

//Start sever
app.listen(port, () => {
    console.log('Server started on port ' + port);
});

module.exports = app;