let MaintenanceJob = require("../models/maintenanceSchema.model");

class UpdateMaintenance {

    // Update a group of Statuses
    static update(req, res) {

        // Get entered params in the body
        const statusData = (req.body.data)

        // In the body there is ID numbers and Statuses - Update each Job by ID number with the status
        for (let i in statusData) {
            MaintenanceJob.findByIdAndUpdate((statusData[i].id), {
                    $set: {
                        status: (statusData[i].status)
                    }
                }).then(result => {
                    console.log(result._id + " is updated to " + statusData[i].status)
                }),
                (error) => {
                    res.send(error.message);
                }
        }

    }
}

module.exports = UpdateMaintenance;