const {thought, user} = require('../models');

const thought_Controller = {
    // Get Thoughts
    getThoughts(req,res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400);
        });
    },

    // Get Thought by the ID
    getThoughtId({params}, res) {
        Thought.findOne({_id: params.id})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'No Thought found with this particular ID.'});
                    return;
                }
                res.json(dbThoughtData);
            }).catch(err => console.log(err));
    },

    // Create a Thought
    createThought({body}, res) {
        Thought.create(body)
            .then(({_id}) => {
                console.log(_id);
                return User.findOneAndUpdate(
                    {_id: body.userId},
                    {$push: {thoughts: _id}},
                    {new: true}
                )
            }).then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'No Thought found with this particular ID.'});
                    return;
                }
                res.json(dbUserData);
            }).catch(err => res.json(err));
    },

    // Update Thought by the given ID
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, { new: true })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({message: 'No Thought found with this particular ID.'});
                    return;
                }
                res.json(dbThoughtData);

            }).catch(err => {
                console.log(err);
                res.json(err);
            })
    },

     // Delete the Thought
     deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                     res.status(404).json({message: 'No Thought found with this particular ID.'});
                     return;
                }
                    res.json(dbThoughtData);
                })
                .catch(err => res.json(err));
    },

    // Create a reaction to the Thought
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } }, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this particular ID.' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // Delete the reaction
    deleteReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: body } }, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this particular ID.' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    }        
}

// Export thought_Controller
module.exports = thought_Controller;