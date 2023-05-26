const mongoose=require('mongoose');

const brandSchema=new mongoose.Schema({
name:{type:String,required:true},
logo:{type:String,required:true},
})


mongoose.model("Brand",brandSchema);
     