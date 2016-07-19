/***************************TILT CODE*****************************/

function changePic(tilt) { // emulates missing gyro/accelerometer output for desktop testing 
//alert(tilt);
	//PORTRAIT panorama display
	panx = (tilt * 200);
	panoffset = 1300;
	//LANDSCAPE panorama display
	if(LANDSCAPE==1){ panx = -(tilt * 100);panoffset = 650;}
	pan('div.container09', pic[9], panx, panoffset);
	
	mixtilt('div.container08', pic[8], tilt - 4);
	mixtilt('div.container07', pic[7], tilt - 2.5);
	mixtilt('div.container06', pic[6], tilt - 1);
	mixtilt('div.container05', pic[5], tilt + 0.5);
	mixtilt('div.container04', pic[4], tilt + 2);
	mixtilt('div.container03', pic[3], tilt + 3.5);
	mixtilt('div.container02', pic[2], tilt + 5);
	mixtilt('div.container01', pic[1], tilt + 6.5);
	mixtilt('div.container00', pic[0], tilt + 8);
		for (n = 0; n < maxslides; n++) {
		//console.log("TILT pics see ...   pic"+n+" = " +pic[n]);
		}

	console.log("tilt= " + tilt);

};

function plus_one() { // increment demo desktop tilt
	tilt = tilt + 0.5;
	//console.log("tilt = " + tilt);
	if (tilt > 8) {
		tilt = -8;
	}
	changePic(tilt);
}

function minus_one() { // decrements demo desktop tilt
	tilt = tilt - 0.5;
	//console.log("tilt = " + tilt);
	if (tilt < -8) {
		tilt = 8;
	}
	changePic(tilt);
}

function mixtilt(div, img, x,n) { // sets css background and opacity of DIV
	$(div).attr("style", " background: transparent url(" + img + ") no-repeat scroll center center / cover ; opacity:" + x);
		pic[n]=img;
	console.log(" html pic[n] = "+ pic[n]);
	console.log(" html div= "+div+" pic= " + img + " ..... tilt = "+tilt);

}

function pan(div, pic, panx, panoffset) {
	
	panx = panx - panoffset;
	// sets css background position of div image
	$(div).attr("style", " background: transparent url(" + pic + ") no-repeat;opacity:1; background-position:" + panx + "px ; background-size:cover;");
	//console.log(" ??????? panx = " + panx);
	console.log(" ??????? tilt = " + tilt);
	//console.log(" ??????? x = " + x);
}

function toggle_setup() { // activated on SHAKE - toggles info setup display
	setup = !setup;
	if (setup === true) {
		$("article.input_boxes").css("display", "block");
		//$("div#message").css("display", "block");	
		$("#buttons").css("display", "block"); 
	}
	if (setup === false) {
		$("article.input_boxes").css("display", "none");
		//$("div#message").css("display", "none");
		$("#buttons").css("display", "none"); 
	}
}

function toggle_input() { // toggle between camera/album store and external url input
	inputtype = !inputtype;
	//alert(setup);
	if (inputtype === true) {
		$("input.setup").css("display", "none");
		$("button.setupBTN").css("display", "block");
	}
	if (inputtype === false) {
		$("input.setup").css("display", "block");
		$("button.setupBTN").css("display", "none");
	}
}

// MOBILE orientation and possitional sensing
var dataContainerOrientation = document.getElementById('dataContainerOrientation');
var dataContainerMotion = document.getElementById('dataContainerMotion');
if (window.DeviceOrientationEvent) {
	window.addEventListener('deviceorientation', function (event) {
		var alpha = event.alpha;
		var beta = event.beta;
		var gamma = event.gamma;
		if (alpha !== null || beta !== null || gamma !== null) {
			dataContainerOrientation.innerHTML = '<strong>Orientation</strong><br />alpha: ' + alpha + '<br/>beta: ' + beta + '<br />gamma: ' + gamma;
		}
	}, false);
}
if (window.DeviceMotionEvent) {
	window.addEventListener('devicemotion', function (event) {
		var x;
		var y;
		var z;
		if (event.accelerationIncludingGravity) {
			x = event.accelerationIncludingGravity.x;
			y = event.accelerationIncludingGravity.y;
			z = event.accelerationIncludingGravity.z;
		} else if (event.acceleration) {
			x = event.acceleration.x;
			y = event.acceleration.y;
			z = event.acceleration.z;
		}

if ( x > 0 ){ 
			$("span.desktop").css("display", "none"); 
}

		//tilt limits settings for desktop test and emulation use
		var html = '<strong>Acceleration</strong><br />';
		// keep left=left when orientation changes
		window.addEventListener("orientationchange", function () {
			O = window.orientation;
		}, false);
		if (O === 0) {
			tilt = x;
		}
		// LANDSCAPE
		if ((O == 90) || (O == -90)) {
			tilt = y;
			LANDSCAPE = 1;
			PORTRIAT = 0;
		}
		else {
			LANDSCAPE = 0;
			PORTRIAT = 1;
		}
		if (tilt < -7.5) {
			tilt = -7.5;
		}
		if (tilt > 6) {
			tilt = 6;
		}
		panx = tilt;
		if (setup === true) {
			tilt = 6;
		}
		//console.log(tilt, flicker); 
		//smooths fade transition by averaging gyro output
		avex = averageIt(tilt, flicker);
		//avex=tilt;
		changePic(averageIt(tilt, flicker)); //alert(avex);

		UD = averageIt2(z, 30);
		msg(UD);
	});
}

//vertical element control - currently of messages
function msg(UD) {
}


//further smoothing
function Round(num) {
	x = num.toFixed(smoothness);
	x = Number(x);
	//x=x*10;
	//console.log(x);
	return x; 
}


//further smoothing
function averageIt(tilt, flicker) {

	averageOf.pop();
	//console.log(averageOf[0]);
	averageOf.unshift(tilt);
	for (i = 0; i < flicker; i++) {
		totalx += averageOf[i];
		//console.log("totalx= " + totalx);
	}

	avex = totalx / flicker;
	//console.log("avexSmoothed= " + avex);
	avex = Round(avex);
	//tilt = avex;
	i = 0;
	totalx = 0;
	flicker = 0;
	return avex;
}

//further smoothing - for a different object - todo - remove and integrate
function averageIt2(tilt, flicker) {
	averageOf2.pop();
	//console.log(averageOf2[0]);
	averageOf2.unshift(tilt);
	while (i < flicker + 1) {
		//console.log("i= " + i);
		totalx += averageOf2[i];
		//console.log("totalx= " + totalx);
		i++;
		//console.log("i= " + i);
	}
	UD = totalx / flicker;
	UD = Round(UD);
	i = 0;
	totalx = 0;
	flicker = 0;
	//console.log("UD= " + UD);
	return UD;
}


