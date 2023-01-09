const router = require("express").Router();
const AuthCtrl = require("../controllers/authCtrl")




router.post("/register", AuthCtrl.register)
router.post("/login", AuthCtrl.loginUser)


module.exports = router; 