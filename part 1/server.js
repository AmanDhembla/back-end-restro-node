var express=require("express");
var bodyParser=require("body-parser");
var morgan =require("morgan");
var dishRouter=require("./dishRouter");
var promoRouter=require("./promoRouter");
var leaderRouter=require("./leaderRouter");
var port=3000;
var hostname='localhost';

var app=express();

app.use(morgan('dev'));

app.use("/dishes",dishRouter);
app.use("/promotions",promoRouter);
app.use("/leadership",leaderRouter);
app.listen(port,hostname,function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
