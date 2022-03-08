const student = require('../controllers/student.server.controller');

// Define the routes module' method
module.exports = function (app) {
    // Mount the 'index' controller's 'render' method
    app.get('/', student.render);

    //renders signup.ejs if a get request is made to /signup path
    app.get('/signup', student.renderSignUp);
    //app.route('/comment_student').post(comment.logout);

    //renders signup.ejs if a get request is made to /signin path
    app.get('/signin', student.renderSignIn);

    //Route to create a student document for 
    app.route('/create')
        .post(student.create)
        .get(student.list);

    app.route('/students')
        .get(student.display);

    app.route('/read_user').post(student.submitComment);

    app.route('/students/:userId')
        .get(student.read)
        .post(student.commentscreate)
    // Set up the 'userId' parameter middleware
    app.param('userId', student.userByID);
};
