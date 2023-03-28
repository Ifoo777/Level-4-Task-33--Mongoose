let MaintenanceJob = require("../models/maintenanceSchema.model");

class DisplayMaintenanceStatus {

    // Display all the jobs by a specific status
    static display(req, res) {

        // Get entered params in the body
        const status = (req.params.data)

        MaintenanceJob.where("status").equals(status).then(result => {
                res.send(result);
            },
            (error) => {
                res.send(error.message);
            }
        );
    }
}

module.exports = DisplayMaintenanceStatus;