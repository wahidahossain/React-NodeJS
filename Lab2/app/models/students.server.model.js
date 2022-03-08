// using the ref to reference another document
//
// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define a new 'StudentSchema'
const StudentSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        // Set an email index
        index: true,
        // Validate the email format
        match: /.+\@.+\..+/
    },
    role: {
        type: String,
        // Validate the 'role' value using enum list
        enum: ['Admin', 'Owner', 'User']
    },
    password: {
        type: String,
        // Validate the 'password' value length
        validate: [
            (password) => password.length >= 6,
            'Password Should Be Longer'
        ]
    },
    studentNumber: Number,
    program: String,
    role: {
        type: String,
        // Validate the 'role' value using enum list
        enum: ['Admin', 'Owner', 'User']
    }
});

StudentSchema.statics.findOneByUsername = function (email, callback) {
    // Use the 'findOne' method to retrieve a user document
    this.findOne({
        email: new RegExp(email, 'i')
    }, callback);
};

// Create the 'authenticate' instance method
StudentSchema.methods.authenticate = function (password) {
    return this.password === password;
};

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
StudentSchema.set('toJSON', {
    getters: true,
    virtuals: true
});
// Create the 'Student' model out of the 'StudentSchema'
mongoose.model('Student', StudentSchema);