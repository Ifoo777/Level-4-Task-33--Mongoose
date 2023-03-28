let MaintenanceJob = require("../models/maintenanceSchema.model");

class UpdateMaintenance {

    // Update information about a specific job by its ID
    static update(req, res) {

        // Get entered params in the body
        const userId = (req.body.id)
        const title = (req.body.title)
        const description = (req.body.description)
        const priority = (req.body.priority)
        const status = (req.body.status)
        const building = (req.body.building)
        const street = (req.body.street)
        const city = (req.body.city)

        MaintenanceJob.findByIdAndUpdate(userId, {
            $set: {
                title: title,
                description: description,
                priority: priority,
                status: status,
                address: {
                    building: building,
                    street: street,
                    city: city
                }
            }
        }).then(result => {
                res.send(result);
            },
            (error) => {
                res.send(error.message);
            }
        );
    }
}

module.exports = UpdateMaintenance;