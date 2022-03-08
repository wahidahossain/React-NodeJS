const Comment = require('mongoose').model('Comment');
const Student = require('mongoose').model('Student');

exports.render = function (req, res) {
    // If the session's 'lastVisit' property is set, print it out in the console 
    if (req.session.lastVisit) {
        console.log(req.session.lastVisit);
    }
    // Set the session's 'lastVisit' property
    req.session.lastVisit = new Date();
    // Use the 'response' object to render the 'index' view with a 'title' property
    res.render('index', {
        title: 'Home Page'
    });
};

exports.renderSignUp = function (req, res) {

    // Use the 'response' object to render the 'signup' view with a 'title' property
    res.render('signup', {
        title: 'Sign Up'
    });

};

exports.renderSignIn = function (req, res) {

    // Use the 'response' object to render the 'add_user' view with a 'title' property
    res.render('signin', {
        title: 'Sign In'
    });

};


exports.create = function (req, res, next) {
    // Create a new instance of the 'User' Mongoose model
    const student = new Student(req.body);

    // Use the 'Student' instance's 'save' method to save a new student document
    student.save((err) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            res.render('index', {
                title: 'Home Page', error: ''
            });
        }
    });
};


exports.commentscreate = async function (req, res, next) {
    // Create a new instance of the 'Comment' Mongoose model
    req.student = req.body;

    const newComment = new Comment();
    const { courseCode, courseName, program, semester, comment } = req.body
    console.log(req.session)
    const student = await Student.findOne({ email: req.session.email })
    newComment.courseCode = courseCode;
    newComment.courseName = courseName;
    newComment.program = program;
    newComment.semester = semester;
    newComment.comment = comment;
    newComment.student = student._id;
    newComment.save()
    //    const allCommentsByStudent = await Comment.find({ student: student._id, courseCode: courseCode, courseName: courseName, program: program })
    //  console.log(allCommentsByStudent)
    //console.log(comment)
    //console.log(newComment)

    var email = req.session.email;
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
                    res.render('thankyou', {
                        title: 'individual comment',
                        comments: comments, email: email, student: student
                    });
                });
        });
};

// 'read' controller method to display a user
exports.read = function (req, res) {
    // Use the 'response' object to send a JSON response
    res.json(req.comment);
};


exports.list = function (req, res, next) {
    // Use the 'User' static 'find' method to retrieve the list of users
    Student.find({}, (err, students) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(students);
        }
    });
};

exports.display = function (req, res, next) {
    // Use the 'User' static 'find' method to retrieve the list of users
    Student.find({}, (err, students) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.render('students', {
                title: 'Student List',
                students: students
            });
        }
    });
};

exports.submitComment = function (req, res, next) {
    req.student = req.body //read the user from request's body
    // Use the 'User' static 'findOne' method to retrieve a specific user
    var email = req.body.email;
    var password = req.body.password;

    console.log(email)
    Student.findOne({
        //finding a document by email and password
        email: email,
        password: password
    }, (err, student) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Set the 'req.student' property
            req.student = student;
            //parse it to a JSON object
            var jsonUser = JSON.parse(JSON.stringify(student));
            req.session.email = email;
            console.log(jsonUser)
            //display edit page and pass user properties to it
            res.render('submit_comments', { title: 'Evaluate a Course', student: jsonUser });

            // Call the next middleware
            next();
        }
    });
};

exports.userByID = function (req, res, next, email) {
    // Use the 'Customer' static 'findOne' method to retrieve a specific customer
    Student.findOne({
        email: email //using the username instead of id
    }, (err, student) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Set the 'req.user' property
            req.student = student;
            console.log(student);
            // Call the next middleware
            next();
        }
    });
};
