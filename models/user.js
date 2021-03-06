// Require Mongoose
const {Schema, model} = require('mongoose');

// Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Enter Valid e-mail Address']
    },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
      ],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
  },
  {
    toJSON: {
      virtuals: true,
      statics: true
    },
    id: false
  });


// Retrieves the length of the user's friends array
  UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Initializes the User model
const User = model('User', UserSchema);

// Export User
module.exports = User;