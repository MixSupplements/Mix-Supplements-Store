const mongoose=require("mongoose");

const storeSchema=new mongoose.Schema({
    name:{type:String,required:true},
    location:{type:String,required:true},
    phoneNumber:[{type:String,required:true}]

})
mongoose.model("Store",storeSchema);














