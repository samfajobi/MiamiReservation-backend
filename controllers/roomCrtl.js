const RoomModel = require('../models/room');
const HotelModel = require('../models/hotel')


const RoomCtrl = {
    createRoom : async (req, res) => {
        const hotelId = req.params.hotelid;
        const roomData = req.body
        try {
            const room = await RoomModel.create(roomData);
            try{
                await HotelModel.findByIdAndUpdate(hotelId, 
                    {
                        $push: {rooms: room._id}
                    }
                );
            } catch(err) {
                return res.status(403).json(err.message)
            }
            res.status(200).json(room)
        } catch (err) {
            res.status(403).json(err.message)
        }
    },

    updateRoom : async ( req, res ) => {
        try {
            const updateRoom = await RoomModel.findByIdAndRemove(
                req.params.id, 
                {
                    $set: req.body
                },
                {
                    new: true
                }
            ) 
            res.status(200).json(updateRoom);
        } catch(err) {
            res.status(403).json(err.message);
        }
    },

    getRoom : async (req, res) => {   
        try {
            const getRoom = await RoomModel.findById(req.params.id);
            res.status(200).json(getRoom);

        }catch(err) {
            res.status(403).json(err.message)

        };
    },

    getAllRooms : async (req, res) => {
        try {
            const getAllRooms = await RoomModel.find();
            res.status(200).json(getAllRooms);   
        }catch(err) {
            res.status(403).json(err.message)
        }

    },

    deleteRoom : async (req, res) => {
        const hotelId = req.params.hotelid
        try {
            await RoomModel.findByIdAndDelete(req.params.id);
            try {
                await HotelModel.findByIdAndUpdate(
                    hotelId, 
                    {
                        $pull: { rooms:  req.params.id}
                    }  
                ) 
            } catch(err) {
                res.status(404).json(err.message)  
            }
            res.status(200).json("This Room has been deleted Successfully!!");
        } catch(err) {
            res.status(403).json(err.message)
        }   
    },

    updateRoomAvalailaility: async (req, res) => {
        try { 
            await RoomModel.updateOne({ "roomNumbers._id": req.params.id}, 
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                }
            })
            res.status(200).json(" Dates has been Updated Successfully")
        } catch(err) {
            res.status(404).json(err.message)
        };
    }
}


module.exports = RoomCtrl;