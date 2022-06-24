const express = require('express');
const mongoose = require('mongoose');

// Formats data to json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'))

// Initialize server
const app = express();

// PORT
const PORT = process.env.PORT || 3001;

// Mongoose connection
mongoose.connect
    (process.env.MONGODB_URI || 'mongodb://localhost:27017/westward', 
    { 
        useNewUrlParser: true 
    });


// Listener
app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}!`);
});