var express=require("express");
var bodyParser=require("body-parser");
var Verify=require("./verify");
var app=express();

var promoRouter=express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route("/")

.get(Verify.verifyOrdinaryUser,function(req,res,next){
  res.end("sending you all the promotions!!!");
})
.post(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
  res.end(`the details added for the promotion are promotions's name: ${req.body.name}
  and description: ${req.body.description}`);
})
.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
  res.end("deleting all promotions");
});

promoRouter.route("/:id")

.get(Verify.verifyOrdinaryUser,function(req,res,next){
  res.end('Will send details of the promotion: ' + req.params.id +' to you!');
})
.put(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req, res, next){
  res.write('Updating the promotion: ' + req.params.id + '\n');
  res.end('Will update the promotion: ' + req.body.name +
            ' with details: ' + req.body.description);
})

.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req, res, next){
  res.end('Deleting promotion: ' + req.params.id);
});
module.exports=promoRouter;
