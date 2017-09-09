var express = require('express');
var router = express.Router();
var passport=require("passport");
var User=require("../models/User");
var Verify=require("./verify");
/* GET users listing. */
router.route("/")
.get(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function(req, res) {
   User.find({},function(err,users){
     if(err){
       throw err;
     }else{
       res.json(users);
     }
   });
});



router.post("/register",function(req,res,next){
  User.register(new User({username:req.body.username}),req.body.password,function(err,User){
    console.log(User);
    if(err){
      return res.status(500).json({err:err});
    }
    passport.authenticate("local")(req,res,function(){
      return res.status(200).json({status:"Registration successful"});
    });
  });
});


router.post("/login",function(req,res,next){
  passport.authenticate('local',function(err,user,info){
    if(err){
      return next(err);
    }

    if (!user){
      console.log("info");
      return res.status(200).json({
        err:info
      });
    }

    req.logIn(user,function(err){
      if(err){
        return res.status(500).json({
          err:"could not log In"
        });
      }
      console.log("user in users: ", user);
      var token=Verify.getToken(user);
      res.status(200).json({
        status:"login successful",
        success:true,
        token:token
      });
    });
  })(req,res,next);

});

router.get("/logout",function(req,res,next){
  req.logout();
  res.status(200).json({
    status:"logout successful"
  });
});

module.exports = router;
