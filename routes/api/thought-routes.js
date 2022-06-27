// UserRoutes

// Require Express
const router = require('express').Router();
const {
    getThoughts,
    getThoughtId,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} 
= require('../../controllers/thought-controller');

// Router '/' 
router
    .route('/')
    .get(getThoughts)
    .post(createThought);

// Router '/:id'
router
    .route('/:id')
    .get(getThoughtId)
    .put(updateThought)
    .delete(deleteThought);

// Router '/reactions'
router
    .route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReaction)

// Export router
module.exports = router;