const router = require('express').Router();
const hotelCtrl = require('../controllers/hotelCtrl');
const { verifyToken, verifyTokenAndUser, verifyTokenAndIsAdmin} = require('../utils/verifyToken');



router.post('/create', verifyTokenAndIsAdmin, hotelCtrl.createHotel);
router.get('/find/:id',  hotelCtrl.getHotel);
router.get('/',  hotelCtrl.getAllHotels);
router.get('/countbycity',  hotelCtrl.getHotelByCity);
router.get('/countbytype', hotelCtrl.getHotelByType);
router.put('/:id',  verifyTokenAndIsAdmin, hotelCtrl.updateHotel);
router.delete('/:id', verifyTokenAndIsAdmin, hotelCtrl.deleteHotel);
router.get('/room/:id', hotelCtrl.getHotelRooms)  

  
module.exports = router;   