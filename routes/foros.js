const express = require('express');
const router = express.Router();
const forosController = require('../controllers/forosController');
const auth = require('../middleware/auth');

router.post('/foros', auth, forosController.createForo);
router.get('/foros', auth, forosController.getForos);
router.get('/foros/:id', auth, forosController.getForoById);
router.put('/foros/:id', auth, forosController.updateForo);
router.delete('/foros/:id', auth, forosController.deleteForo);

module.exports = router;