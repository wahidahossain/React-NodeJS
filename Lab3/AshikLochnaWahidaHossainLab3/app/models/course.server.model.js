const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    courseCode: {
        type: String,
        unique: true,
        required: true
    },
    courseName: {
        type: String,
        default: '',
        trim: true,
        required: 'Course name cannot be blank.'
    },
    section: {
        type: String,
        default: '',
        trim: true,
        required: 'Section cannot be blank.'
    },
    semester: {
        type: String,
        default: '',
        trim: true,
        required: 'Semester cannot be blank.'
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'Student'
    }
});
mongoose.model('Course', CourseSchema);