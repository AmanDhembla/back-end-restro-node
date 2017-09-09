var express=require("express");
var bodyParser=require("body-parser");
var Verify=require("./verify");
var favorites=require("../models/favorites");

var favoriteRouter=express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route("/")
.get(Verify.verifyOrdinaryUser,function(req,res,next){
  favorites.findOne({postedBy:req.decoded._doc._id})
    .populate('postedBy')
    .populate('dishes')
    .exec(function(err,Favorite){
      if(err)throw err;

      res.json(Favorite);
    })
})

.post(Verify.verifyOrdinaryUser,function(req,res,next){
  var a;
  var c=favorites.find({});
  console.log(c);
  for(var i=0;i<c.length;i++){
    if(req.decoded._doc._id=c[i].postedBy){
      a=c[i];
      console.log(a);
    }
  }

  favorites.findOne({postedBy:req.decoded._doc._id},function(err,favorite){
    if(err){
      res.json(err);
    }
    if(favorite==null){
      var favorite=new favorites();
      favorite.postedBy=req.decoded._doc._id;
      favorite.dishes.push(req.body._id);
      console.log(req.body._id);
      favorite.save(function(err,favorite){
        if(err) throw err;
        res.json(favorite);
      });
    }else{
      // count is taken so as to assure not to save same dish again and again 
      var count=0;
      for(var i=0;i<favorite.dishes.length;i++){
        if(favorite.dishes[i]==req.body._id){
          console.log("hello");
          count++;
        }
      }
      if(count==0){
        favorite.postedBy=req.decoded._doc._id;
        favorite.dishes.push(req.body._id);
        favorite.save(function(err,favorite){
          if(err) throw err;
          res.json(favorite);
        });
      }else{
        var message={
          "msg":"dish already bookmarked"
        }
        res.json(message);
      }

    }
  });


})

.delete(Verify.verifyOrdinaryUser,function(req,res,next){
  favorites.remove({},function(err,resp){
    if(err)throw err;
    res.json(resp);
  });
});

favoriteRouter.route("/:dishObjectId")
.delete(Verify.verifyOrdinaryUser,function(req,res,next){

//$pullAll removes all the values that we want to remove from the array that is passed by us to it
    favorites.update({postedBy:req.decoded._doc._id},{ $pullAll:{ dishes:[req.params.dishObjectId]}},function(err,resp){
      if(err){
        throw err;
      }
      favorites.find({postedBy:req.decoded._doc._id},function(err,favorite){
        if(err){
          throw err;
        }
        res.json(favorite);
      });
    });

  });


module.exports=favoriteRouter;
