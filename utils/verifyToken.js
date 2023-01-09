const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;

    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if(err) {
                res.status(401).json(err.message, "Invalid Token!!")
            }else {
                req.user = user
                next();            }
        });
    } else {
        res.status(401).json({msg: "You are Not Authenticated!!"})
    } 
}

const verifyTokenAndUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else {
            res.status(401).json("Not allowed!! You are not allowed!!")
        }
    })
}


const verifyTokenAndIsAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("Not allowed!!!! You are not an admin")
        }

    })
}



module.exports = { verifyToken, verifyTokenAndUser, verifyTokenAndIsAdmin }