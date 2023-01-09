const UserModel = require('../models/user')

const UserCtrl = {
     updateUser : async (req, res ) => {
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(req.params.id);
            res.status(200).json(updatedUser)

        } catch (err) {
            res.status(403).json(err.message);
        }
    },
  
    getUser : async (req, res) => {
        try {
            const user = await UserModel.findByIdAndUpdate(req.params.id)
            res.status(200).json(user)

        } catch (err) {
            res.status(200).json(err.messsage)
        }
    },

    getAllUsers : async (req, res) => {
        try {  
            const users = await UserModel.find();
            res.status(200).json(users)

        } catch(err) {
            res.status(403).json(err.message)
        }
    },   
  
    deleteUser : async (req, res) => {
        try {
            await UserModel.findByIdAndDelete(req.params.id)
            res.status(200).json("This User has been deleted Successfully!!")

        } catch(err) {
            res.status(403).json(err.message);
        }
    }
}



module.exports = UserCtrl;