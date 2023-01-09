const router = require("express").Router();
const userCtrl = require('../controllers/userCrtl')
const { verifyToken, verifyTokenAndUser, verifyTokenAndIsAdmin} = require('../utils/verifyToken');




router.put('/', verifyTokenAndUser, userCtrl.updateUser);
router.get('/:id', verifyTokenAndUser, userCtrl.getUser);
router.get('/', verifyTokenAndIsAdmin, userCtrl.getAllUsers);
router.delete('/:id', verifyTokenAndUser, userCtrl.deleteUser);



module.exports = router;