let express = require('express');
let router = express.Router();

// Use the controller file to action
const UpdateMaintenanceStatus = require('../controllers/updateMaintenanceStatus.controller')

router.put('/', UpdateMaintenanceStatus.update)

module.exports = router;