let express = require('express');
let router = express.Router();

// Use the controller file to action
const UpdateMaintenanceArchive = require('../controllers/updateMaintenanceArchive.controller')

router.put('/', UpdateMaintenanceArchive.update)

module.exports = router;