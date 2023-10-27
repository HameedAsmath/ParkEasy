const mongoose = require("mongoose")

const parkinglotSchema = new mongoose.Schema({
    email:{
        type: String,
        default: null,
    },
    refid:{
        type: String
    },
    area:{
        type: String,
        default: null,
        unique: true
    },
    state:{
        type: String,
        default: null
    },
    lat:{
        type: Number
    },
    lng:{
        type: Number
    },
    carlot:{
        type: Number
    },
    caramount:{
        type: Number
    },
    bikelot:{
        type: Number
    },
    bikeamount:{
        type: Number
    },
    buslot:{
        type: Number
    },
    busamount:{
        type: Number
    },
})
module.exports = mongoose.model("parking",parkinglotSchema)