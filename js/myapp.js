$.getScript("js/vars.js", function () {});
$.getScript("js/tilt.js", function () {});
//$.getScript("js/jstorage.min.js", function () {});



angular.module('myApp', []).controller('formCtrl', function ($scope, $http) {
	$scope.flush= function() {
	localStorage.removeItem($scope.selectedSetName);
	changePic(6);
	for (i = 0; i < maxslides; i++) {
		//get_local_images(i);
		mixtilt(i, i, i)
	}
};
	

	/****************start var stops default images being re-loaded ***************************/
	if (start === 0) {
		read_json($scope, $http, $scope.selectedSetName);
		start = 1;
	};

	/**************** Pasted URL handler ****************/
	$scope.setHtmlImage = function (n, img, selectedSetName) {
		//alert("!!!");
		setHtmlImage(n, img, selectedSetName);
	};

	/************saves current set as json data to local html5 store *****************************/
	$scope.save_json = function () {
		console.log("SET NAME READ FIRST HERE ££££££££££££££££££££££££££ $scope.selectedSetName= " + $scope.selectedSetName);
		selectedSetName = $scope.selectedSetName;
	};


	$scope.loadlocalpics = function () {

		
var pic = localStorage.getItem($scope.selectedSetName).split(',');

		
			if (pic === null) {
			console.log=($scope.selectedSetName + " has no content yet ..............................................................................................................................");
		} else{
		
		console.log(" *********************** " + $scope.selectedSetName + " NAMED JSON LIST SET ************** " + pics);
		}
		
		//var pic = pics.split(',');
			console.log(" *********************** " + $scope.selectedSetName + " SPLIT LIST SET ************** " + pic[0]);
			console.log(" *********************** " + $scope.selectedSetName + " SPLIT LIST SET ************** " + pic[1]);
			console.log(" *********************** " + $scope.selectedSetName + " SPLIT LIST SET ************** " + pic[2]);
		for (n = 0; n < maxslides; n++) {
			var div="container0"+n;
			var img=pic[n];
		mixtilt(div, img, 7,n)
		console.log("AAAAA div = "+div+" pic "+img+ " "+n+" *********************** " + $scope.selectedSetName); 
	}
		
		changePic(7);
		console.log("!!!!!!!END "+ $scope.selectedSetName +" CONTENTS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

	};
	$scope.savelocalpics = function () {
		savelocalpics();
	};
});

/******************** END OF SCOPED FUNCTIONS ******************************/
/******************** END OF SCOPED FUNCTIONS ******************************/
/******************** END OF SCOPED FUNCTIONS ******************************/
/******************** END OF SCOPED FUNCTIONS ******************************/
/******************** END OF SCOPED FUNCTIONS ******************************/




function savelocalpics(){/*
		console.log(" !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! " + selectedSetName + " SPLIT LIST SET ************** " + pic[0]);
			console.log(" !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! " + selectedSetName + " SPLIT LIST SET ************** " + pic[1]);
			console.log(" !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! " + selectedSetName + " SPLIT LIST SET ************** " + pic[2]);
		console.log("attempting to save set " + selectedSetName);*/
		//jsonSet = JSON.stringify(pic);
	/*console.log("attempting to save set " + selectedSetName+" jsonSet is "+jsonSet+" WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");*/
	
		localStorage.setItem(selectedSetName, pic);
}

//gets default images from local Json file
function read_json($scope, $http, selectedSetName) {
	//alert("75 selectedSetName = "+ selectedSetName);
	$http.get('kcards.json').success(function (response) {
		for (n = 0; n < maxslides; n++) {
			pic[n] = response[n][n];
		};
	});
}






// gets file from camera store API and overrides anything already set.
function setHtmlImage(n, img, selectedSetName) { //Gets URL from Input box - or other source - and saves to local storage
	console.log("103 selectedSetName = "+selectedSetName);
	console.log("!!!!!!!  pic" + n + " has a new image now in pic array !!!!!!!!!!");
	pic[n] = img; // stores img in pic array for display as background in TILT code 
}


// handles local device camera pic selection
function handleFiles(files, n) {
	//alert("loading camera pic");
	for (var i = 0; i < files.length; i++) {
		//var img = document.createElement("img");
		img = window.URL.createObjectURL(files[i]);
		pic[n]=img;
		savelocalpics(pic);
		setHtmlImage(n, img, selectedSetName);
		changePic(tilt);

	}
}
