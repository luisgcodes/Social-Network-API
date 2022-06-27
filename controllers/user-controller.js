const { User } = require('../models');


const user_Controller = {
    
    // Get Users
    getUsers(req,res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Get User by ID
    getById({params}, res) {
        User.findOne({_id: params.id})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'No user found with this particular ID.'});
                    return;
                }
                res.json(dbUserData);
            }).catch(err => console.log(err));
        },

        // Create a User
        createUser({body}, res) {
            User.create(body)
                .then(dbUserData => res.json(dbUserData))
                .catch(err => res.status(400).json(err));
        },

        // Update the User by the ID
        updateUser({params, body}, res) {
            User.findOneAndUpdate({_id: params.id}, body, {new:true, runValidators: true})
                .then(dbUserData => {
                    if (!dbUserData) {
                        res.status(404).json({message: 'No user found with this particular ID.'});
                        return;
                    }
                    res.json(dbUserData);
                }).catch(err => console.log(err));
        },

         // Delete the User
        deleteUser({params}, res) {
            User.findOneAndDelete({_id: params.id})
                .then(dbUserData => {
                    if (!dbUserData) {
                        res.status(404).json({message: 'No user found with this particular ID.'});
                        return;
                    }
                res.json(dbUserData);
            }).catch(err => console.log(err));
    },

    // Add a Friend 
    addFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends: params.friendId}},
            {new: true, runValidators: true}
            ).then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'No user found with this particular ID.'});
                    return;
                }
                res.json(dbUserData);
            }).catch(err => console.log(err));
    },

     // Delete a Friend
     deleteFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true}
        ).then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this particular ID.'});
                return;
            }
            res.json(dbUserData);
        }).catch(err => console.log(err));
    }
}

// Export user_Controller
module.exports = user_Controller;