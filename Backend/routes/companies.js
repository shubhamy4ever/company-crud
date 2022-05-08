const express = require("express");
const router = express.Router();
const Companymodel = require("../models/companymodels");

// fetching all data
router.get("/fetchall",async(req,res)=>{
const alldata = await Companymodel.find({});
if(!alldata){
  return res.status(404).json({success,error:"cant find anything"});
}
res.json(alldata);
});


//fetching data to display in table from db searched one
router.get("/fetchdata", async (req, res) => {
    
  try {
    if(!req.body.name || req.body.name==null || req.body.name.length < 3 || req.body.name==""){
      let success = false;
      return res.status(400).json({success,error:"empty search box"});
    }
    success = true;
    const namebox = req.body.name;
    const company = await Companymodel.find({ companyName: namebox });
   
    res.json(company);

  } catch (err) {
    res.status(500).json({error:"internal server error"});
  }
});

//adding data to database in mongo db with .save()
router.post("/addcompany", async (req,res)=>{
try{
  const {name,mail} =req.body; //destructuring
  let nameexistindb = await Companymodel.findOne({companyName:name}); //dont forgot await
  let emailexistindb = await Companymodel.findOne({contactEmail:mail}); //because it returns a promise
  if(nameexistindb || emailexistindb){
    let success = false;
    return res.status(409).send({success,msg:"email and company name should be unique"});
  }
  success=true;
const companydata = new Companymodel({
    companyName:name,
    companyDescription:req.body.description,
    contactNumber:req.body.number,
    contactEmail:mail,
    state:req.body.state,
    city:req.body.city
});
const saveDetails = await companydata.save();
res.json(saveDetails);
}catch(err){
    res.status(500).json({error:"internal server error"});
}
});


//editing data to desired value
router.put("/editdata/:id", async (req,res)=>{
try{
const {name,description,number,mail,state,city} = req.body;
const updatedvalue ={};
if(name){
  updatedvalue.companyName = name;
}
if(description){
  updatedvalue.companyDescription = description;
}
if(number){
  updatedvalue.contactNumber = number;
}
if(mail){
  updatedvalue.contactEmail = mail;
}
if(state){
  updatedvalue.state = state;
}
if(city){
  updatedvalue.city = city;
}

let companytoedit = await Companymodel.findById(req.params.id);
if(!companytoedit){
  success=false;
  res.status(400).json({success,msg:"could'nt find data to update"});
}
companytoedit = await Companymodel.findByIdAndUpdate(req.params.id,{
$set:updatedvalue,
});
res.json(companytoedit,{msg:"Updated please refresh the page"});
}catch(err){
  res.status(500).json({error:"internal server error"});
}
});



module.exports = router;
