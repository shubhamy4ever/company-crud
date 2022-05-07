const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const url="mongodb+srv://mainuser:1800123@cluster0.s4dmk.mongodb.net/IconnectCompany?retryWrites=true&w=majority";

//connect to database mongodb
try{
    mongoose.connect(url,()=>{
        console.log("connected to db!!")
        });
}catch(err){
    console.log(err," could not connect to database");
}



app.get("/",(req,res)=>{
res.send("hello");
});

//routes
app.use(express.json());  //imp 
app.use("/",require("./routes/companies"));


//models


app.listen(port,()=>{
    console.log(`listening on ${port}`);
})