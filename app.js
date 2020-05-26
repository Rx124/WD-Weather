const express=require("express");
const bodyParser=require("body-parser");
const app = express();
const request = require("request");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    var cityName=req.body.city;
    var appId="526708779169284b58ac03729a7fbd37";
    var options={
        url:"http://api.openweathermap.org/data/2.5/weather",
        qs:{
            q:cityName,
            appid:appId,
        }
    }
    request(options,function(error,response,body){
        var data=JSON.parse(body);
        console.log(Number(data.main.temp)-273.15);
        var temp=(Number(data.main.temp)-273.15).toFixed(2);
        res.write('Current temperature is '+temp+' ºC ');
        res.write('\nWith '+data.weather[0].description+', '+data.main.pressure+' hpa Pressure and '+data.main.humidity+'% Humidity.');
        res.send();
    });
});

app.listen(3000,function(){
    console.log("Server started on port 3000");
});