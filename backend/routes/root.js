const express = require('express');
const router = express.Router();
const path = require('path');


// this is a route to the index page
// page must begin with a slash and end with a slash, or it could be /index.html or /index
router.get('^/$|/index(.html)?', (req, res) => {   // ^/$ begin with a slash and end with a slash | (or) /index.html  ()? makes the ".html" optional
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));      // this means that the response sends the file which is located in the current directory (currently called backend) and joins it with the following path "./views/index.html"
})

// this is a route to the new-page page
// the page must be /new-page or /new-page.html
router.get('/new-page(.html)?', (req, res, next) => {  
    // this means that the response sends the file which is located in the current directory (currently called backend) and joins it with the following path "./views/new-page.html"
    res.sendFile(path.join(__dirname, '..', './views/new-page.html'));
    next(); 
}, (res, req) => {
    console.log('this is a chained route, where it first loads new page, and then logs this to the console');
});

// this is the 404 route, where anything else routes to this
router.all('*', (req, res) => {  
    // this means that the response sends the file which is located in the current directory (currently called backend) and joins it with the following path "./views/new-page.html"
    res.sendFile(path.join(__dirname, '..', './views/404.html')); 
});

module.exports = router;