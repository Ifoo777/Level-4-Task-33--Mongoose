let express = require('express');
let router = express.Router();

// Use the controller files to action
const UpdateMaintenance = require('../controllers/updateMaintenanceJob.controller')
const DisplayMaintenanceJob = require('../controllers/displayMaintenanceJob.controller')

router.put('/', UpdateMaintenance.update)

router.get('/:data', DisplayMaintenanceJob.display)

module.exports = router;