const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const preferencesController = require('../controllers/preferences');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/preferences', preferencesController.postPreferences);
router.get('/preferences', preferencesController.getPreferences);

module.exports = router;