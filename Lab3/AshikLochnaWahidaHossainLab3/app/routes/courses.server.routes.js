const students = require('../../app/controllers/students.server.controller');
const courses = require('../../app/controllers/courses.server.controller');

module.exports = function (app) {
    app.route('/courses')
        .get(courses.list)
        .post(students.requiresLogin, courses.create);

    app.route('/courses/:courseId')
        .get(courses.read)
        .put(students.requiresLogin, courses.hasAuthorization, courses.update)
        .delete(students.requiresLogin, courses.hasAuthorization, courses.delete);

    app.route('/show_courses_by_student/:id')
        .get(courses.CoursesByStudent);
        
    app.param('courseId', courses.courseByID);
};
