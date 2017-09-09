var express=require("express");
var bodyParser=require("body-parser");
var Verify=require("./verify");
var app=express();
var Dishes=require("../models/dishes");
var dishRouter=express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
// .all(function(req,res,next){
//   res.writeHead(200,{"content-Type":"text/plain"});
//
//   next();
// })
// .get(Verify.verifyOrdinayUser,function(req,res,next){
  Dishes.find({},function(err,dishes){
    if(err){
      throw err;
    }
    res.json(dishes);
  });
  //res.end("displaying all the dishes that there are in the menu");
})
.post(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){

  Dishes.create(req.body,function(err,dish){
    if(err){
      throw err;
    }
    res.json(dish);
  });

})
.delete(function(req,res,next){
  Dishes.remove({},function(err,resp){
    if(err)throw err;
    res.json(resp);
  });
});

dishRouter.route("/:id")
// .all(function(req,res,next){
// })
.get(function(req,res,next){
  Dishes.findById(req.params.id,function(err,dish){
    if(err) throw err;
    res.json(dish);
  });
})
.put(function(req, res, next){
  Dishes.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true},function(err,dish){
    if(err) throw err;
    res.json(dish);
  })
})

.delete(function(req, res, next){
  Dishes.findByIdAndRemove(req.params.id,function(err,resp){
    if(err) throw err;
    res.json(resp);
  });
});

dishRouter.route("/:id/comments")
.get(function(req,res,next){
  Dishes.findById(req.params.id,function(err,dish){
    if(err) throw err;
    res.json(dish.comments);
  });
})
.post(function(req,res,next){
  Dishes.findById(req.params.id,function(err,dish){
    if(err) throw err;
    dish.comments.push(req.body);
    dish.save(function(err,dish){
      if(err)throw err;
      res.json(dish);
    });
  });
})
.delete(function(req,res,next){
  Dishes.findById(req.params.id,function(err,dish){
    if(err)throw err;
    for(var i=0;i<dish.comments.length;i++){
      dish.comments.id(dish.comments[i]._id).remove();
    }
    dish.save(function(err,dish){
      if(err){
        throw err;
      }
      res.json(dish);
    })
  });
});

dishRouter.route("/:id/comments/:commentId")
.get(function(req,res,next){
  Dishes.findById(req.params.id,function(err,dish){
    if(err) throw err;
      res.json(dish.comments.id(req.params.commentId));
  });
})
.put(function(req,res,next){
  Dishes.findById(req.params.id,function(err,dish){
    if(err)throw err;

    dish.comments.id(req.params.commentId).remove();

    dish.comments.push(req.body);
    dish.save(function(err,dish){
      if(err)throw err;
      res.json(dish);
    });
  });
})
.delete(function(req,res,next){
  Dishes.findById(req.params.id,function(err,dish){
    if(err)throw err;
    console.log(dish);
    dish.comments.id(req.params.commentId).remove();
    dish.save(function(err,dish){
      if(err) throw err;
      res.json(dish);
    });
  });
});
module.exports=dishRouter;
