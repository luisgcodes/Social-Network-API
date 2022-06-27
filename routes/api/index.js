// Require Express
const router = require('express').Router();

// Require user-routes
const userRoutes = require('./user-routes');

// Require thought-routes
const thoughtRoutes = require('./thought-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;