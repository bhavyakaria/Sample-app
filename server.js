const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database: '+ config.database);
});

// Error on connection
mongoose.connection.on('error', (err) => {
    console.log('Error: '+err);
});

// Initialize express
const app = express();

const users = require('./routes/users');

// Set port number
const port = 3000;

// Set cors Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index route
app.get('/', (req, res) => {
    res.send("Invalid Response!");
});

// Starting server
app.listen(port, () => {
    console.log("Server running on: "+port);
});
