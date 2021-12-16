const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/', (req, res, next) => {

    res.redirect('./home');
});

router.get('/home', (req, res, next) => {

    res.sendFile(path.join(__dirname, '../resources/views/home.html'));
});

router.get('/login', (req, res, next) => {

    res.sendFile(path.join(__dirname, '../resources/views/login.html'));
});


module.exports = router;