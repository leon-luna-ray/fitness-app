const express = require('express');
const mongoose = require('mongoose');
const db = require('../models');

const router = express.Router();

router.get ('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html')); 
});