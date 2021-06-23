var express=require("express"); 
var app=express();
var PORT = process.env.PORT || 3000;
//const path=require('path')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));


require("./note route/apiroute")(app);
require("./note route/htmlroute")(app);

//start the server
app.listen(PORT, function () {
	console.log("App listening on PORT: " + PORT);
});