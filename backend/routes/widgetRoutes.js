const express = require('express');
const router = express.Router();
const widgetController = require('../controllers/widgetController.js');

router.get('/widgets', widgetController.fetchWidgets);
router.post('/widgets', widgetController.addNewWidget);
router.delete('/widgets/:id', widgetController.removeWidget);

module.exports = router;