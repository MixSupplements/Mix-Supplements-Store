const mongoose  = require("mongoose");
const ordersModel=mongoose.model("Order");

module.exports.getAllOrders=(req,res,next)=>{
    ordersModel.find({deleted:false}).select("-__v")
    .then((data)=>{
        res.status(200).json({message:"All Orders",data})
    }).catch((err)=>{
        err.status=422;
        next(err)
        
    })
}

module.exports.addOrder=(req,res,next)=>{
    const orderObject=new ordersModel(req.body)
    orderObject.save()
    .then((data)=>{
        res.status(201).json({message:"added",data})
    }).catch((err)=>{
        err.status=422;
        next(err)
        
    })
}

module.exports.getOrderById=(req,res,next)=>{
    ordersModel.findOne({_id:req.params.id,deleted:false})
    .then((foundedOrder)=>{
        if(foundedOrder===null)throw new Error("Order Not Exist")
        res.status(200).json({message:"Get One Order",foundedOrder})
    }).catch((err)=>{
        err.status=422;
        next(err)
    })
}

module.exports.updateOrder=(req,res,next)=>{
    ordersModel.findOneAndUpdate({_id:req.params.id,deleted:false},req.body,{new:true})
    .then((updated)=>{
        if(updated===null)throw new Error("Order Not Exist")
        res.status(200).json({message:"Updated Order",updated})
    }).catch((err)=>{
        err.status=422;
        next(err)
        })
}

module.exports.deleteOrder=(req,res,next)=>{
    ordersModel.findOneAndUpdate(
        {_id:req.params.id,deleted:false},
        {
            $set:{deleted:true}
        },
        {new:true})
    .then((deleted)=>{
        if(deleted===null)throw new Error("Order Not Exist")
        res.status(200).json({message:"Deleted Order",deleted})
    }).catch((err)=>{
        err.status=422;
        next(err)
        })
}