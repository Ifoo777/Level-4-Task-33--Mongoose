let MaintenanceJob = require("../models/maintenanceSchema.model");

class DisplayMaintenanceJob {

    // Display a specific job by ID
    static display(req, res) {

        // Get entered params in the body
        const id = (req.params.data)

        MaintenanceJob.findById(id).then(result => {
                res.send(result);
            },
            (error) => {
                res.send(error.message);
            }
        );
    }
}

module.exports = DisplayMaintenanceJob;