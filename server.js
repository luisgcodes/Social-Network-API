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