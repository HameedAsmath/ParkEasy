const mongoose = require("mongoose")

const bookedparkingSchema = new mongoose.Schema({
    bookedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    vehicle:{
        type: String
    },
    amount:{
        type: Number
    },
    hour:{
        type: Number
    },
    bookedParking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "parking"
    },
    isPaid:{
        type: Boolean,
        default: false
    }
},{ timestamps: true })
module.exports = mongoose.model("BookedParking",bookedparkingSchema)