const { Schema, model } = require("mongoose");
const reactionSchema = require('./Reaction');

// Schema to create the thought model
const thoughSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
    },
);

// Virtual property `reactionCount` that retrieves the length of the thought's reactions array field on query.
thoughSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('thought', thoughSchema);

module.exports = Thought;
