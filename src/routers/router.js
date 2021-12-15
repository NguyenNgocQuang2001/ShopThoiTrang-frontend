const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/', (req, res, next) => {

    res.json("client run oke :))");
});

router.get('/home', (req, res, next) => {

    res.sendFile(path.join(__dirname, '../resources/views/home.html'));
});

router.get('/login', (req, res, next) => {

    res.sendFile(path.join(__dirname, '../resources/views/loginandlogout/login.html'));
});

router.get('/logout', (req, res, next) => {

    res.sendFile(path.join(__dirname, '../resources/views/loginandlogout/logout.html'));
});


module.exports = router;