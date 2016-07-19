//detects APPLE mobiles

var Apple = {};
var ipad = "false";
Apple.UA = navigator.userAgent;
Apple.Device = false;
Apple.Types = ["iPhone", "iPod", "iPad", "other"];
for (var d = 0; d < Apple.Types.length; d++) {
	var t = Apple.Types[d];
	Apple[t] = !!Apple.UA.match(new RegExp(t, "i"));
	Apple.Device = Apple.Device || Apple[t];
}
//$.jStorage.flush();
//sets global variables
var $scope=[];
var start = 0;
//var $scope[selectedSetName]= "Set0";
var pics = "";
var maxslides=10;
var ResetAll = "true";
var O = 0;
var flicker = 25;
var tilt = 0,
	topPos = 0,
	avex = 0,
	smoothness = 4,
		but="true";
	totalx = 0;
var averageOf = [];
for (var i = 0; i < flicker; i++) {
	averageOf.push(0);
}
var averageOf2 = [];
for (var i = 0; i < 31; i++) {
	averageOf2.push(0);
}
var i = 0,
	localStorage = "",
	selectedSetName ="Set0",
	setName="",
	newlocalpic = "",
	LANDSCAPE = 1,
	PORTRIAT = 0,
	inputtype="true"
	temp = "",
	x = 0,
	y = 0,
	setup = true,
	read = 0,
	localpic = "",
	pic = [],
	UD = "",
	userpic = "",
	set = "",
	panx = 0,
		setName="",

	kcard_pics_data = "";
var pics = [];