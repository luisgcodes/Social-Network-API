const express = require('express');
const mongoose = require('mongoose');

// Initialize server & PORT
const app = express();
const PORT = process.env.PORT || 3001;

// Formats data to json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(require('./routes'))


// Mongoose connection
mongoose.connect
    (process.env.MONGODB_URI || "mongodb://localhost/nosql-social-network-api", 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    });


mongoose.set('debug', true);

// Listener
app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}!`);
});