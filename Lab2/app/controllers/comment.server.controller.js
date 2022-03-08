const Comment = require('mongoose').model('Comment');


exports.display = function (req, res, next) {
    // Use the 'User' static 'find' method to retrieve the list of users
    Comment.find({}, (err, comments) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.render('comments', {
                //title: 'List of all comments',
                comments: comments
            });
        }
    });
};



exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('index', {
                title: 'Home Page'
            });
        }
    });


}; //end of function


exports.commentsByStudent = function (req, res, next) {
    var email = req.session.email;
    //find the student then its comments using Promise mechanism of Mongoose
    Student.
        findOne({ email: email }, (err, student) => {
            if (err) { return getErrorMessage(err); }
            //
            req.id = student._id;
            console.log(req.id);
        }).then(function () {
            //find the posts from this author
            Comment.
                find({
                    student: req.id
                }, (err, comments) => {
                    if (err) { return getErrorMessage(err); }
                    //res.json(comments);
                    res.render('comments', {
                        title: 'individual comment',
                        comments: comments, email: email
                    });
                });
        });



};
