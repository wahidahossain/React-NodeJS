//this function handles routing of requests
module.exports = function (app) {
    //load the controller(s)
    var index = require('../controllers/index.server.controller');
    
    //handle the routing of get request to the route
    //by showing the login screen
    app.get('/', function (req, res) {
        //display login page
        res.render('index', { loginMessage: 'Login to evalute the course:' });

    });
    //the form uses a post request to the same path ('/')
    app.post('/', function (req, res) {
        //use the controller function
        index.displayInfo(req, res);
        
    });

//new code goes here------------------------
//form action="results.ejs" putting in here ---------
app.post('/thankyou.ejs', function (req, res) {
    //use the controller function
    index.displayResults(req, res);
    
});

};
