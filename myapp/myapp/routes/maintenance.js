let express = require('express');
let router = express.Router();

// Use the controller files to action
const Maintenance = require('../controllers/createMaintenance.controller');
const DisplayMaintenanceStatus = require('../controllers/displayMaintenanceStatus.controller')

router.post('/', Maintenance.create)

router.get('/:data', DisplayMaintenanceStatus.display)


module.exports = router;