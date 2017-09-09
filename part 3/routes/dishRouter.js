var express=require("express");
var bodyParser=require("body-parser");
var Verify=require("./verify");
var app=express();

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
  res.end("displaying all the dishes that there are in the menu");
})
.post(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
  res.end(`the details added for the dish are dish's name: ${req.body.name} and description: ${req.body.description}`);
})
.delete(function(req,res,next){
  res.end("deleting all dishes");
});

dishRouter.route("/:id")
.all(function(req,res,next){
  res.writeHead(200,{"content-Type":"text/plain"});

  next();
})
.get(function(req,res,next){
  res.end('Will send details of the dish: ' + req.params.id +' to you!');
})
.put(function(req, res, next){
  res.write('Updating the dish: ' + req.params.id + '\n');
  res.end('Will update the dish: ' + req.body.name +
            ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
  res.end('Deleting dish: ' + req.params.id);
});
module.exports=dishRouter;
