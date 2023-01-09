const mongoose = require("mongoose");



const RoomSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please Enter a Username"],
            trim: true
        },
        desc: {
            type: String,
            // required: [true, "Please Enter an Email"],
            trim: true, 
            unique: true
        },
        price: {
            type: Number,
            required: true
        },
        maxNoPeople: {
            type: String,
            required: true
        },
        roomNumbers: [{number: Number, unavailableDates: {type: [Date]}}]
    },

    { timestamps: true }

)


module.exports = mongoose.model("RoomModel", RoomSchema)
