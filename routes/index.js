// Require Express/Api
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// 404 Error Response
router.use((req, res) => {
    res.status(404).send('<h1>404 Error</h1>');
});

module.exports = router;