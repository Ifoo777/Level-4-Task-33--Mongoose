let MaintenanceJob = require("../models/maintenanceSchema.model");

class CreateMaintenance {

    // Create a new document with the entered parameters
    static create(req, res) {
    console.log(req.body)
        // Get entered params in the body
        const title = (req.body.title)
        const description = (req.body.description)
        const priority = (req.body.priority)
        const status = (req.body.status)
        const building = (req.body.building)
        const street = (req.body.street)
        const city = (req.body.city)

        // Create and save a new blog
        const newMaintenance = new MaintenanceJob({
            title: title,
            description: description,
            priority: priority,
            status: status,
            address: {
                building: building,
                street: street,
                city: city
            },
            archive: false
        })

        newMaintenance.save(function (err, data) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    message: "Some error occurred while creating the new Job."
                });
            } else {
                console.log('New Job has been added');
                res.send(data);
            }
        })
    }
}

module.exports = CreateMaintenance;