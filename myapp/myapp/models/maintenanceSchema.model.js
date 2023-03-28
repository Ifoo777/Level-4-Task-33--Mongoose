const mongoose = require("mongoose")

const maintenanceSchema = new mongoose.Schema({
    title: {
        type : String,
        required: true
    },
    description: String,
    priority: Number,
    status: String,
    dateCreated:{
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    address: {
        building: String,
        street: String,
        city: String,
    },
    archive: Boolean
  
})

module.exports = mongoose.model("MaintenanceJob", maintenanceSchema)
