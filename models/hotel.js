const mongoose = require("mongoose");



const HotelSchema = new mongoose.Schema(
    {
        name: {type: String, required: [true, "Please Enter a Username"], trim: true },
        type: { type: String,  required: true }, 
        city: { type: String, },
        address: { type: String, required: true },
        ratings: { type: Number, max: 5, min: 0 },
        title: { type: String,},
        desc: { type: String, required: true },
        photos: { type: [String], required: true },
        price: { type: Number,  required: true },  
        rooms: { type: [String], required: true},  
        featured: {type: Boolean,  default: false},  
    },     
    { timestamps: true }
)



module.exports = mongoose.model("HotelModel", HotelSchema);
