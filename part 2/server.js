var mongoose=require("mongoose");
var assert=require("assert");
var Dishes=require("./models/dishes");
var Promotions=require("./models/promotions");
var Leadership=require("./models/leadership");
var url="mongodb://localhost:27017/conFusion";

mongoose.connect(url,{
  useMongoClient:true
});

var db=mongoose.connection;

db.on("error",console.error.bind(console,"connection error"));

db.once("open",function(){
  // Dishes.create({
  //   name:"aman",
  //   description:"yo yo",
  //   category:"main",
  //   image:"he he ha ha",
  //   price:500,
  //   comments:[{
  //     rating: 4,
  //     comment: "yo sexy",
  //     author: "aman dhembla"
  //   }]
  // },function(err,dish){
  //     assert.equal(err,null);
  //     console.log(dish);
  //
  //     var id=dish._id;
  //     console.log(id);
  //
  //     Dishes.findByIdAndUpdate(id,{$set:{description:"i am a bitch"}},{new:true})
  //
  //           .exec(function(err,dish){
  //             assert.equal(err,null);
  //             console.log("Updated dish:");
  //             console.log(dish);
  //
  //             db.collection("dishes").drop(function(){
  //               db.close();
  //             });
  //           });
  //
  // });

  Leadership.create({
    name:"aman",
    description:"i am so sexy",
    abbr:"CEO",
    image: "fadda",
    designation:"fnsagonosgo"
  },function(err,promotion){
    assert.equal(err,null);
    console.log(promotion);
    db.collection("leadership").drop(function(){
      db.close();
    });
  });
});
