'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/products', require('./products'));
router.use('/users', require('./users'));
router.use('/carts', require('./carts'));
router.use('/reviews', require('./reviews'));
router.use('/address', require('./address'));
router.use('/emails', require('./emails'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});







