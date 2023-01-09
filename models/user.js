const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please Enter a Username"],
            trim: true
        },
        email: {
            type: String,
            // required: [true, "Please Enter an Email"],
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },  
    { timestamps: true}
)


UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


module.exports = mongoose.model("UserModel", UserSchema)
