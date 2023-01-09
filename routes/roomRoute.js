const router = require('express').Router();
const RoomCtrl = require('../controllers/roomCrtl');
const { verifyTokenAndUser, verifyTokenAndIsAdmin} = require('../utils/verifyToken');



router.post('/:hotelid',   RoomCtrl.createRoom);
router.put('/:id', verifyTokenAndIsAdmin, RoomCtrl.updateRoom);
router.put('/availability/:id', RoomCtrl.updateRoomAvalailaility);
router.get('/:id', verifyTokenAndUser, RoomCtrl.getRoom);
router.get('/', RoomCtrl.getAllRooms);
router.delete('/:id/:hotelid', verifyTokenAndIsAdmin, RoomCtrl.deleteRoom);




module.exports = router;  