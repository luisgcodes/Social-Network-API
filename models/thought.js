// Require Mongoose & date
const { Schema, model, Types } = require('mongoose');
const date_format = require('../utils/date');

// ReactSchema
const ReactSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactBody: {
        type: String,
        required: true,
        maxlength: 280,
        trim: true
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => date_format(createdAtVal)
    }
}, {
    toJSON: {
        getters: true
    }
});

// ThoughtSchema
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactSchema]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// Retrieves the length of the user's friends array
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Initializes the User model
const Thought = model('Thought', ThoughtSchema);

// Export Thought
module.exports = Thought;