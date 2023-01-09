
const Hotel = require('../models/hotel');
const Room = require('../models/room')


const HotelCtrl = {  

    createHotel : async (req, res) => {
        try {
            const hotelData = req.body
            const hotel = await Hotel.create(hotelData)
            res.status(200).json(hotel);
        } catch (err) {      
            res.status(500).json(err.message) 
        }
    },          

    getHotel : async (req, res) => {
        try {
            const hotel = await Hotel.findById(req.params.id)
            res.status(200).json(hotel);

        } catch(err) {
            res.status(500).json(err.message)

        }   
     
    },     

    getHotelByCity : async (req, res) => {
        const Cities = req.query.cities.split(",");
        try {
            const hotelList = await Promise.all(Cities.map(city => {
                return Hotel.countDocuments({city:city})
            })) 
            res.status(200).json(hotelList);

        }catch(err) {
            res.status(403).json(err.message)
        }  
    },            

    getHotelByType : async (req, res) => {
        try{
            const hotelCount = await Hotel.countDocuments({type: "hotel"})
            const resortCount = await Hotel.countDocuments({type: "resort"})
            const apartmentCount = await Hotel.countDocuments({type: "apartment"})
            const villaCount = await Hotel.countDocuments({type: "villa"})
            const cabinCount = await Hotel.countDocuments({type: "cabin"})

            res.status(200).json([  
                {type: "hotels", count: hotelCount}, 
                {type: "resorts", count: resortCount},  
                {type: "apartments", count: apartmentCount},
                {type: "villas", count: villaCount} , 
                {type: "cabins", count: cabinCount}  
            ]);  
        } catch(err) {
            res.status(403).json(err.message)   
        }
    },
      
    getAllHotels : async (req, res) => {
        const { min, max, ...others} = req.query
        try {
             const Hotels = await Hotel.find({...others, price: { $gt: min || 1, $lt: max || 999}
             }).limit(req.query.limit);
   
            res.status(200).json(Hotels);  

        } catch(err) {
            res.status(500).json(err.message)
        }; 
    },

    updateHotel : async (req, res) => {
        try {
            const updateHotel = await Hotel.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body  
                },
                {new: true}
                )
            res.status(200).json(updateHotel)

        } catch(err) {i
            res.status(500).json(err.message)

        }  
   
    },  
    
    deleteHotel : async (req, res) => {
        try {
            await Hotel.findByIdAndDelete(req.params.id)
            res.status(200).json("Hotel has been deleted Successfully!!!")

        } catch(err) {
            res.status(500).json(err.message) 

        }
    }, 

    getHotelRooms : async (req, res) => {
        try {
            const hotelRooms = await Hotel.findById(req.params.id)
            const roomlists = await Promise.all(hotelRooms.rooms.map(room => {
                return Room.findById(room)
            }));

            res.status(200).json(roomlists);
             
        } catch(err) {  
            res.status(500).json(err.message)
        }
    }
};



module.exports = HotelCtrl;