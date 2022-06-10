const routeHistory = require('./routeHistory');
const routeUser = require('./routeUser');
const routeView = require('./routeView');

const express = require('express');
const routeAdmin = require('./routeAdmin');

const router = express.Router();

router.use(routeHistory);
router.use('/api', routeUser);
router.use(routeView);
router.use('/admin', routeAdmin);

module.exports = router;
