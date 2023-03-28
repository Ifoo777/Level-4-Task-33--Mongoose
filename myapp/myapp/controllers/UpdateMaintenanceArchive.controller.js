let MaintenanceJob = require("../models/maintenanceSchema.model");

class UpdateMaintenanceArchive {

    // Archive Data
    static update(req, res) {

        const jobId = (req.body.id)

        // If 0, then Archive all the completed tasks, if it has an ID, Archive the specific ID
        if (jobId === 0) {
            MaintenanceJob.updateMany({
                    status: "COMPLETED"
                }, {
                    $set: {
                        status: "ARCHIVED/COMPLETED",
                        archive: true
                    }
                })
                .then(result => {
                    res.send(result)
                }),
                (error) => {
                    res.send(error.message);
                }
        } else {
            MaintenanceJob.findByIdAndUpdate(jobId, {
                    $set: {
                        status: "ARCHIVED/COMPLETED",
                        archive: true
                    }
                })
                .then(result => {
                    res.send(result)
                }),
                (error) => {
                    res.send(error.message);
                }
        }
    }
}

module.exports = UpdateMaintenanceArchive;