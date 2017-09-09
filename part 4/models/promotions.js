var mongoose=require("mongoose");

require("mongoose-currency").loadType(mongoose);
var Currency=mongoose.Types.Currency;

var Schema=mongoose.Schema;

var promotionSchema=new Schema({
  name:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  label:{
    type:String,
    default:""
  },
  price:{
    type:Currency,
    required:true
  }},
  {
    timestamps:true
  }
);

var Promotions=mongoose.model("Promotion",promotionSchema);

module.exports=Promotions;
