const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction'); // Is this correct?

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true, // Check docs on this one
            trimmed: true, //Check docs how to trim
        },
        email: {
            type: String,
            required: true,
            unique: true, // double check
            // ** TODO: Add - Must match a valid email address (look into Mongoose's matching validation)
        },
        thoughts: {
            // ** TODO: Array of _id values referencing the Thought model
        },
        friends: {
            // ** TODO: Array of _id values referencing the User model (self-reference)
        },
    },
    // ** TODO: toJSON 
);

// TODO: Schema Settings - Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

const User = model('user', userSchema);

module.exports = User;
