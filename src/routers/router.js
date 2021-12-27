const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/', (req, res, next) => {

    res.redirect('./profile');
});

router.get('/product', (req, res, next) => {

    res.sendFile(path.join(__dirname, '../resources/views/product.html'));
});

router.get('/login', (req, res, next) => {

    res.sendFile(path.join(__dirname, '../resources/views/login.html'));
});

router.get('/logout', (req, res, next) => {

    res.sendFile(path.join(__dirname, '../resources/views/logout.html'));
});

router.get('/profile', (req, res, next) => {

    res.sendFile(path.join(__dirname, '../resources/views/profile.html'));
});


module.exports = router;