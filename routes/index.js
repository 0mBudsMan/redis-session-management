const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const preferencesController = require('../controllers/preferences');
const sessionController = require('../controllers/session');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/preferences', preferencesController.postPreferences);
router.get('/preferences', preferencesController.getPreferences);

router.post('/session', sessionController.createSession);
router.post('/session/page', sessionController.logPage);
router.get('/session', sessionController.getSessionDetails);
router.delete('/session', sessionController.deleteSession);

module.exports = router;