const comment = require('../controllers/comment.server.controller');


module.exports = function (app) {
    app.route('/comments')
        .get(comment.display);

    app.route('/comment_student').post(comment.logout);
    //-------------------------------------------------
    

}