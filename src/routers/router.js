const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/', (req, res, next) => {

    res.redirect('/product');
});

router.get('/product', (req, res, next) => {

    /*var sortBy = req.query.sortBy;
    var search = req.query.search;
    var page = Number(req.query.page) || 1;
    if (page < 1) {
        page = 1;
    }
    if (sortBy) {

        res.cookie('sortBy', sortBy, {
            maxAge : 60 * 60 * 1000
        });
    }
    
    if (search) {

        res.cookie('search', search, {
            maxAge : 60 * 60 * 1000
        });
    }

    res.cookie('page', String((page - 1) % 9), {
        maxAge : 60 * 60 * 1000
    });

    res.cookie('startPos', String(Math.floor((page - 1) / 9) * 9 + 1), {
        maxAge : 60 * 60 * 1000
    });*/

    res.sendFile(path.join(__dirname, '../resources/views/product.html'));
});

router.get('/product/:idpro', (req, res, next) => {

    res.sendFile(path.join(__dirname, '../resources/views/orderproduct.html'));
});

router.get('/login', (req, res, next) => {

    res.sendFile(path.join(__dirname, '../resources/views/login.html'));
});

router.get('/logout', (req, res, next) => {

    res.sendFile(path.join(__dirname, '../resources/views/logout.html'));
});

router.get('/profile', (req, res, next) => {

    var user = req.cookies.user;
    if (user && user != '') {
        res.redirect('/profile/' + user);
    } else {
        res.redirect('/logout');
    }
});

router.get('/profile/:user', (req, res, next) => {

    res.sendFile(path.join(__dirname, '../resources/views/profile.html'));
});


module.exports = router;