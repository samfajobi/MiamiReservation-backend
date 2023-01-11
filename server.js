const express = require("express");
const mongoose = require("mongoose");
// const UserRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const hotelRoute = require('./routes/hotelRoute');
const userRoute = require('./routes/userRoute');
const roomRoute = require('./routes/roomRoute');


const dotenv = require("dotenv");
const cors = require('cors')
const app = express();


const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions)) // Use this after the variable declaration  

 
app.use(express.json());

dotenv.config();

// app.use("/api/users", UserRoute);
app.use("/api/auth", authRoute);
app.use('/api/hotel', hotelRoute);
app.use('/api/user', userRoute);
app.use('/api/room', roomRoute);



mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Database Connection Successfull")) 
.catch(() => console.log("Database Connection UnSuccessful!!!"));  
 

app.get("/", (req, res) => 
    res.send("You are Welcome Back")
);  
 
//app.use("/user", UserRoute);
 
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`)
});