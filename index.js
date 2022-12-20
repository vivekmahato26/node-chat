const express = require("express");
const {json, urlencoded} = require("express");
const mongoose = require("mongoose");
const auth = require("./middleware/auth");

const userRouter = require("./routes/userRoute");
const messageRouter = require("./routes/messageRoute");

const app = express();

app.use(json());
app.use(urlencoded({extended: false}));
app.use(auth);

const mongoUrl = "mongodb+srv://admin:qwerty001@cluster0.r1oratx.mongodb.net/node-chat"
mongoose.connect(mongoUrl, (err)=> {
    if(err) console.log(err);
    else console.log("DB connected");
})

app.use("/users",userRouter);
app.use("/messages",messageRouter);



app.listen(4000,()=>console.log("Server running at 4000"))