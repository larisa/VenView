var display = function(){
	document.getElementById("Column2").style.visibility="visible";
}
var heightt = 250;
var fixedHeight = 30;
var citycount = 1;
var cityNum = 0;
var activeCities =[];
function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] == obj) {
            return true;
        }
    }
    return false;
}
function dosomething(){
	if(citycount < 4){
		if(contains(activeCities, "#city1") == false){
			if(activeCities.length == 0){
				document.getElementById("city_1").style.display="block";
				activeCities.push("#city1");
			}
			else if(activeCities.length == 1){
				//if there is a 5 or a 6 take their value
				var valoo1 = document.getElementById("city3").value;
				var valoo2 = document.getElementById("city2").value;
				if(valoo1 != ""){
					document.getElementById("city1").value = valoo1;
					document.getElementById("city3").value = "";
					document.getElementById("city_1").style.display="block";
					activeCities.push("#city1");	
				}
				else if(valoo2 != ""){
					document.getElementById("city1").value = valoo2;
					document.getElementById("city2").value = "";
					document.getElementById("city_1").style.display="block";
					activeCities.push("#city1");	
				}
				
			}
			else if(activeCities.length == 2){
				//take the value of 5 
				//give 5 the value of 6
				var valoo1 = document.getElementById("city3").value;
				var valoo2 = document.getElementById("city2").value;
				document.getElementById("city1").value = valoo2;
				document.getElementById("city2").value = valoo1;
				document.getElementById("city3").value = "";
				document.getElementById("city_1").style.display="block";
				activeCities.push("#city1");
			}

		}
		else if(contains(activeCities, "#city2") == false){
			if(activeCities.length == 1){
				document.getElementById("city_2").style.display="block";
				activeCities.push("#city2");
			}
			else if(activeCities.length == 2){
				var valoo = document.getElementById("city3").value;
				document.getElementById("city2").value = valoo;
				document.getElementById("city3").value = "";
				document.getElementById("city_2").style.display="block";
				activeCities.push("#city2");
			}
		}
		else if(contains(activeCities, "#city3") == false){
			if(activeCities.length == 2){
				document.getElementById("city_3").style.display="block";
				activeCities.push("#city3");
			}
		}
	citycount++;
	cityNum++;
	}
	if(citycount == 4){
		document.getElementById("citLink").style.display="none";
	}
}

var directionDisplay;
var service;
var directionsService = new google.maps.DirectionsService();
var map;
var geocoder;
function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();

	
  var chicago = new google.maps.LatLng(41.850033, -87.6500523);
  var myOptions = {
    zoom:7,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: chicago
  }
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	service = new google.maps.places.PlacesService(map);
	geocoder = new google.maps.Geocoder();
  directionsDisplay.setMap(map);
	var origin = document.getElementById('originInput');
	var autocomplete = new google.maps.places.Autocomplete(origin);
	var dest = document.getElementById('destInput');
	var autocomplete = new google.maps.places.Autocomplete(dest);
	var city1 = document.getElementById('city1');
	var autocomplete = new google.maps.places.Autocomplete(city1);
	var city2 = document.getElementById('city2');
	var autocomplete = new google.maps.places.Autocomplete(city2);
	var city3 = document.getElementById('city3');
	var autocomplete = new google.maps.places.Autocomplete(city3);
	setRemoveCommentHandlers();
	
}


function findVenues(location){
	var kan = new google.maps.LatLng(38.891033, -94.526367);
	//document.getElementById("change").innerHTML="hi";
	//return kan;
	geocoder.geocode({"address": location}, function(results, status){
		if (status == google.maps.GeocoderStatus.OK){
			//map.setCenter(results[0].geometry.location);
			var c = results[0].geometry.location;
			var request = {
	          location: c,
	          radius: 500,
	          types: ['night_club']
	        };
	        infowindow = new google.maps.InfoWindow();
	        var service = new google.maps.places.PlacesService(map);
	        service.search(request, callback);

				
		}
		else{
			//document.getElementById("change").innerHTML="hi";
			//return kan;
		}
	});

}
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function setRemoveCommentHandlers() {
	  $('.remove_city').unbind('click');
	  $('.remove_city').click(function() {
	    $(this).parents('.controls').first().fadeOut();
	    citycount--;
		var id=$(this).attr('id');
		if(id == "rc1"){
			removeByElement(activeCities,"#city1");
			document.getElementById("city1").value = "";

		}
		if(id == "rc2"){
			removeByElement(activeCities,"#city2");
			document.getElementById("city2").value = "";
		}
		if(id == "rc3"){
			removeByElement(activeCities,"#city3");
			document.getElementById("city3").value = "";
		}
	    if(citycount < 4){
			document.getElementById("citLink").style.display="block";
		}
		$('#Enter').click();
	  });
	}

function removeByElement(arrayName,arrayElement){
	  for(var i=0; i<arrayName.length;i++){ 
	  if(arrayName[i]==arrayElement)
	  {arrayName.splice(i,1);} 
	  } 
}
function calcRoute() {
	
  var ori = $("#originInput").val();
  var en = $("#destInput").val();
  var request;
	if(activeCities.length == 0){
		request = {
	      origin: ori, 
	      destination: en,

	      travelMode: google.maps.DirectionsTravelMode.DRIVING
	  };	
	}

	if(activeCities.length == 1){
		var cityName = activeCities[0];
		var c = $(cityName).val();
 	request = {
      origin: ori, 
      destination: en,
	waypoints:[
	{location: c,
		stopover: true}
	],

      travelMode: google.maps.DirectionsTravelMode.DRIVING
  };}
	if(activeCities.length == 2){
		var cityName = activeCities[0];
		var c = $(cityName).val();
		var cityName = activeCities[1];
		var c1 = $(cityName).val();
 	request = {
      origin: ori, 
      destination: en,
	waypoints:[
	{location: c,
		stopover: true},
	{location: c1,
		stopover: true}
	],

      travelMode: google.maps.DirectionsTravelMode.DRIVING
  };}
	if(activeCities.length == 3){
		var cityName = activeCities[0];
		var c = $(cityName).val();
		var cityName = activeCities[1];
		var c1 = $(cityName).val();
		var cityName = activeCities[2];
		var c2 = $(cityName).val();
 	request = {
      origin: ori, 
      destination: en,
	waypoints:[
	{location: c,
		stopover: true},
	{location: c1,
		stopover: true},
	{location: c2,
		stopover: true}
	],

      travelMode: google.maps.DirectionsTravelMode.DRIVING
  };}


  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

var myBookings = [];
var displayedGig = null;


$(document).ready(function() {
	$('.clickables').keypress(function(e) {
	  	  	if (e.keyCode == '13' &&  this.value != '') {
						$('#Enter').click();
	  	  	}
	});
	$('.cities').keypress(function(e) {
	  	  	if (e.keyCode == '13' &&  this.value != '') {
						$('#Enter').click();
	  	  	}
	});

	$("#Enter").click(function(evt) {
		var bDate = document.getElementById('start_cal').value;
		var eDate = document.getElementById('end_cal').value;
		var genre = document.getElementById('genre').value;
		var cap = document.getElementById('cap').value;
		var style = document.getElementById('style').value;
		var origin = document.getElementById('originInput').value;
		var dest = document.getElementById('destInput').value;
		
		//cities shouldn't be ordered, one can hav cities 1 through 5, then delete 3, this should not affect behavior
		//also I can try to call initiate at every Enter. That would be better in terms of the autocompelte elements. 
		var cit1 = document.getElementById('city1').value;
		var cit2 = document.getElementById('city2').value;
		var cit3 = document.getElementById('city3').value;

		findVenues(origin);
		findVenues(dest);
		if(bDate != null && eDate!= null && genre != null && cap != null && style!= null && origin!="" && dest!=""){
			if(citycount == 1){
			
			calcRoute();
			display();}
			if(citycount == 2 && cit1!=""){
			calcRoute();
			display();}
			if(citycount == 3 && cit1!="" && cit2!=""){
			calcRoute();
			display();}
			if(citycount == 4 && cit1!="" && cit2!="" && cit3!=""){
			calcRoute();
			display();}
		}
		

		
	});

	draw();
	drawButtons();
});

var numberOfVenues= 5; //set static for now, but then length pf listOfVenues

function draw(){
	var canvas = document.getElementById("canvasMoneyBtns");
	var ctx = canvas.getContext('2d');
	var theSize = 400/5;
	var theSize2 = 30;
	
	
		for(i=0;i<numberOfVenues+1;i++){
			
			ctx.fillStyle = "rgb(0,0,0)";
			ctx.beginPath();
			ctx.moveTo(i*theSize,0);
			ctx.lineTo(i*theSize,numberOfVenues*fixedHeight);
			ctx.stroke();
			
			ctx.fillStyle = "rgb(0,0,0)";
			ctx.beginPath();
			ctx.moveTo(0,i*fixedHeight);
			ctx.lineTo(400,i*fixedHeight);
			ctx.stroke();
		
			
		}	
}

function get_venue_openings(){
		var venueOpenings = [];
		var venueNames = ["Paradise", "Beehive", "House",
											"Paradise", "Beehive", "House",
										 "Paradise", "Beehive", "House"];
		var allDates = [1, 4, 3, 2, 3, 2, 4, 5, 5];
		var startTimes = [10, 15, 18, 19, 20, 10, 23, 22, 4]; 
		var allDur = [40, 20, 30, 70, 20, 120, 60, 30, 40];
		var allDollars = ["$$$", "$$", "$$", "$", "$$", "$", "$$$", "$$", "$"];

		for (var i=0; i<=8; i++){
				var gig = new Booking(venueNames[i], allDates[i], startTimes[i], 
															allDur[i], allDollars[i]);
				venueOpenings.push(gig);
		}

		return venueOpenings;
		
}
function drawButtons(){
	var venueOpenings = get_venue_openings();
	for (var i=0; i<venueOpenings.length; i++){
			var opening = venueOpenings[i];
			document.getElementById("allMoneyBtns").appendChild(drawButton(opening,i));

			}
}
var VenueList = ["Paradise", "Beehive", "House"];
function showText() {
	var cxt = document.getElementById("allMoneyBtns").getContext('2d');

	ctx.font = 'bold 12px sans-serif';
	cxt.textAlign = "left";
	ctx.textBaseline = "top";
	

	for(var i=0; i<VenueList.length; i++){
	}
}

var toppest = 10;
function drawButton(gigOpening, i){
	//console.log("making button allegedly");
	var bookBtnInfo = gigOpening;
	var bookBtn = document.createElement("button");

		
	//var bookBtn = document.createElement("img");
	//bookBtn.setAttribute("src","map.png");
	var canvas = document.getElementById("canvasMoneyBtns");
	bookBtn.setAttribute("id", "moneyBtn" + i);
//	bookBtn.setAttribute("class", "moneyBtn");
	bookBtn.className = "moneyBtn";
	bookBtn.setAttribute("type", "button");
	//bookBtn.type = "button";
//	bookBtn.setAttribute("name", bookBtnInfo.dollars);
	//bookBtn.name = bookBtnInfo.dollars;
		bookBtn.innerHTML = bookBtnInfo.dollars;
		bookBtn.label = bookBtnInfo;

	//$("moneyButton" + i, "moneyBtn").click(function() { return false;});


	//TODO figure out position based on venue name + date
//	bookBtn.style.position = "absolute";

	$(bookBtn).css("position", "absolute");
	$(bookBtn).css("left", (bookBtnInfo.date-1)*400/5);
	var topDistance = 0;
	if(bookBtnInfo.venue == "Paradise"){
		topDistance = 0;
	}
	if(bookBtnInfo.venue == "Beehive"){topDistance=1;}
	if(bookBtnInfo.venue == "House"){topDistance=2;}
		bookBtnInfo.top = topDistance*fixedHeight + 5; //+heightt/24
	$(bookBtn).css("top", topDistance*fixedHeight + 5); // + heightt/24
	$(bookBtn).css("width", 400/5+ "px");
	$(bookBtn).css("height", 20 + "px");
	$(bookBtn).css("z-index", ++toppest);
	return bookBtn;
}

function drawSelectButton(booking){
	var btn = document.createElement("button");
	var canvas = document.getElementById("canvasMoneyBtns2");
	btn.className = "selectBtns";
	btn.setAttribute("id", "temp");
	btn.setAttribute("type", "button");
	btn.style.fontSize = "8px";
	btn.innerHTML = "click me";
	
	//	bookBtn.label = bookBtnInfo;
	$(btn).css("position", "absolute");
	$(btn).css("left", booking.left+55);

	$(btn).css("top", booking.duration+15);
	$(btn).css("width", 40+ "px");
	$(btn).css("height", 10 + "px");
	$(btn).css("z-index", 102);
	return btn;
}

$(function(){
		$(".moneyBtn").button();
		$(".moneyBtn").click(function() {
				console.log("moneybtn click");
				var currBooking = this.label;
				drawSchedule(currBooking);
				displayedGig = currBooking;
				$('.moneyBtn').attr('disabled', true);
				return false;
				
		});
		
});
$(function(){
	$("#selectBtns").button();
	$("#selectBtns").click(function() {
			console.log("selectBtn click");
			
				var canvas = document.getElementById("canvasMoneyBtns2");
				canvas.width = canvas.width;
				$('.moneyBtn').attr('disabled', false);
				myBookings.push(displayedGig);
				displayedGig = null;
				for(var i = 0; i<VenueList.length; i++){
						document.getElementById(VenueList[i]).setAttribute("style","color:black;");
					
				}
				document.getElementById("selectBtns").removeChild(document.getElementById("temp"));
			return false;
			
	});	
});

//takes Booking object of moneyBtn that was clicked
function drawSchedule(selBooking){
		var canvas = document.getElementById("canvasMoneyBtns2");
		canvas.width = canvas.width;
		displayedGig = null;

		var context = canvas.getContext("2d");
		//open booking rectangle block proportional to its duration
		var length = selBooking.duration;
		var width = 400/5;
		//console.log("length:" + length + "width" + width);
		context.fillStyle = selBooking.color;
		//set height to be 50 constant

		document.getElementById(selBooking.venue).setAttribute("style","color:"+selBooking.color+";");
		for(var i = 0; i<VenueList.length; i++){
			if(VenueList[i]!=selBooking.venue){
				document.getElementById(VenueList[i]).setAttribute("style","color:black;");
			}
		}
		//paint calendar bg
		var bgCalImg = new Image();
		bgCalImg.src = 'calendarBg.png';
		context.drawImage(bgCalImg, selBooking.left, 0);

		//paint curr venue time-block
		console.log("x" + selBooking.left+35 + "y" + selBooking.duration);
		context.fillRect(selBooking.left+35, selBooking.duration, width, length);
		context.font = 'bold 11px sans-serif';
		context.textAlign = "left";
		context.textBaseline = "top";
		context.fillStyle = "white";
		context.fillText("book me, click me",selBooking.left+35,selBooking.duration, width, length);
		document.getElementById("selectBtns").appendChild(drawSelectButton(selBooking));



		//document.getElementById("canvasMoneyBtns2").style.zIndex="100";
		//document.getElementById("canvasMoneyBtns").style.zIndex="101";


}



