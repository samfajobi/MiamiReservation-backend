const UserModel = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

// const validateEmail = (email) => {
//     return String(email)
//       .toLowerCase()
//       .match(
//         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//       );
//   };    

// const jwtSecret = process.env.JWT_SECRET_KEY;
const jwtAlgorithm = "HS256";
// const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
    
  
const AuthCtrl =  {

    register : async (req, res) => {
        try {
            const {email, password, username} = req.body;
            if(!email || !password || !username) {
                return res.status(500).json({msg: "Please Input all Fields"})
            } else if (password.length < 8) {
                return res.status(400).json("Password Length must be atleast 8 !!")
            }
            const userExist = await UserModel.findOne({email: email})
            userExist &&  res.status(401).json("User Already Exist")

            const user = await UserModel.create({ email, password, username})
            return res.status(200).json({user, msg:"Registration Successfull"}) 
            
   
            // if(!validateEmail(email)) {
            //     return res.status(500).json({msg: "Invalid Email Address"});
            // }
            // const userOne = UserModel.findOne({email});
            // if(userOne) {
            //     return res.status(400).json({msg: "This User already Exist"})
            // } else {
            //      return res.status(400).json({msg: "Registered Successfully!!"})
            // }
    
            // if(password.length < 8) return res.status(400).json({msg: "Password must be atleast 8 characters"});

            // console.log(req.body)
            // res.status(200).json({msg: "Test Register"})
        } catch(err) {
            return res.status(500).json({msg: err.message}) 
        }
    },


    loginUser : async (req, res) => {
        const {email, password } = req.body;
        try {
            const user = await UserModel.findOne({email: email})
            !user && res.status(200).json("Wrong Credentials. User not found!!")

            const validate = await bcrypt.compare( req.body.password, user.password)
            !validate && res.status(400).json("Password Incorrect!!!")
            
            const token = jwt.sign(
                {
                    email: user.email,
                    id: user._id,  
                    isAdmin: user.isAdmin
                },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                    algorithm: jwtAlgorithm 
                },
            )
            const {password, isAdmin, ...userData} = user._doc
            await res.status(200).json({userData, token})

        } catch (err) {
            res.status(401).json(err.message)

        }

    },
}


module.exports = AuthCtrl;
