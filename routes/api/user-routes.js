// UserRoutes

// Require Express
const router = require('express').Router();
const {
    getUsers,
    getById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} 
= require('../../controllers/user-controller');

// Router '/' 
router
    .route('/')
    .get(getUsers)
    .post(createUser);

// Router '/:id'
router
    .route('/:id')
    .get(getById)
    .put(updateUser)
    .delete(deleteUser);

// Router '/:friendID'
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

// Export router
module.exports = router