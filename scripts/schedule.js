/// Calendar code

var startDate, endDate, today;
var dates = [];

function loadCalendars() {

	// send end date to begin at start date when a new start date is selected
	$("#start_cal").datepicker({

		minDate : 0,
		onSelect : function(dateText, inst) {
			today = new Date();
			startDate = parseDate(dateText);
			dayAfterStartDate = new Date();
			dayAfterStartDate.setTime(startDate.valueOf());
			dayAfterStartDate.setTime(startDate.getTime() + 86400000);

			$("#end_cal").datepicker("option", "minDate", dayAfterStartDate);

		}
	});

	//save differences between the two dates when start and end date are selected
	$("#end_cal").datepicker({
		minDate : 0,
		// changeMonth: true,
		// changeYear: true,
		onSelect : function(dateText, inst) {
		endDate = parseDate(dateText);
		dates = getDates(startDate, endDate);
		}
	});
	
	//remove the div causing bug
	document.getElementById("ui-datepicker-div").style.display="none";

}
// parse date
function parseDate(str) {
	var mdy = str.split('/');
	return new Date(mdy[2], mdy[0] - 1, mdy[1]);
}


function highlightDays(first, second) {
	var difference = dateDifference(first, second);
	for ( var i = 0; i < difference; i++) {
		return [ true, 'highlight' ];
	}
}

function getDates( d1, d2 ){
	  var oneDay = 24*3600*1000;
	  var results = []
	  for (ms=d1*1,last=d2*1;ms<=last;ms+=oneDay){
	    results.push( new Date(ms) );
	  }
	  return results;
	}


		
//// End of calendar Code
function timeMsg()
{
var t=setTimeout("display()",500);
}
var display = function(){
	document.getElementById("Column2").style.visibility="visible";
//	a = a + "<br />" + markersArray.length + "<br />" + counter;
//	for(var i =0; i<20; i++){
//	a = a + markersArray[i][1] + "<br/ >";	
//	}
//	document.getElementById("debug").innerHTML = a;
	drawTable();
	
	
	
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

function addCities(){
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
					removeByElement(activeCities,"#city3");
					activeCities.push("#city1");
					activeCities.push("#city3");	
				}
				else if(valoo2 != ""){
					document.getElementById("city1").value = valoo2;
					document.getElementById("city2").value = "";
					document.getElementById("city_1").style.display="block";
					removeByElement(activeCities,"#city2");
					activeCities.push("#city1");
					activeCities.push("#city2");	
				}
				
			}
			else if(activeCities.length == 2){
				//take the value of 2 
				//give 2 the value of 3
				//put in the right order in activeCities so route can be computed correctly 
				var valoo1 = document.getElementById("city3").value;
				var valoo2 = document.getElementById("city2").value;
				document.getElementById("city1").value = valoo2;
				document.getElementById("city2").value = valoo1;
				document.getElementById("city3").value = "";
				document.getElementById("city_1").style.display="block";
				a = activeCities.pop();
				b = activeCities.pop();
				activeCities.push("#city1");
				activeCities.push(b);
				activeCities.push(a);
				
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
				removeByElement(activeCities,"#city3");
				activeCities.push("#city2");
				activeCities.push("#city3");
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
var infowindow;
function initialize() {


	infowindow = new google.maps.InfoWindow();

	loadCalendars();
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
function findVenuesAlongPath(){
	//get directions from the api, choose stops at random
	// google directions specify entering and passing through. learn how to isolate and retrieve 
	//findVenues(stop) per stop
	//display a maximum number of them
	for(var i = 0; i<array.length; i++){
		if (i%10 == 0){
		var latlng = new google.maps.LatLng(array[i][0], array[i][1]);
		reverseGeocodeVenue(latlng);}
	}
	
	//	reverseGeocodeVenue(latlng);
	//remember to figure out how to remove markers after they've been inserted
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
	          radius: 500, //change radius later
	          types: ['food']
	        };
	        var service = new google.maps.places.PlacesService(map);
	        service.search(request, callback);

				
		}
		else{

		}
	});

}
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
		counter++;
    }
  }
}
var markersArray = []; //new Array(200); //[];
var counter = 0;
function createAMarker(latlng) {
	counter++;
  var marker = new google.maps.Marker({
    map: map,
    position: latlng
  });
	var name;
	var boo = true;
	name = chooseName();
	while(boo){
		if(name in namesList){
			name = chooseName();
		}
		else{
			namesList.push(name);
			boo = false;
		}
	}
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(name);
    infowindow.open(map, this);
  });

	markersArray.push([marker,name]);
	//markersArray[counter]=[marker,name];
	//counter++;
	
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

	markersArray.push([marker,place.name]);
	//markersArray[counter]=[marker,name];
	//counter++;
}
function deleteOverlays() {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i][0].setMap(null);
    }
    markersArray.length = 0;
	namesList.length = 0; //check if this was removed
	//cpunter = 0;
	//markersArray = new Array(200);
  }
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
var array = [];
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
//Hartford, CT
//41.730330
//-72.718506

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);

		var len = venuesData.length;
		var num;
		var ranNum;
		
		var na; 
		
		for (var i = 0; i < response.routes[0].overview_path.length-10; i=i+10) {
			var c = response.routes[0].overview_path[i];
			var yesNo = Math.random();
		//	c.slice(1, -1);
			var k = ""+c;
			var l = k.slice(1, -1);
			var lon = l.split(",")[0];
			var lat  = l.split(",")[1].slice(1);
			var lonn = parseFloat(lon);
			var latt = parseFloat(lat);
			array.push([lonn, latt]);
			
			//a =a + lonn + "," + latt + "<br />";
			//a =a + array.pop() + "<br />";
			//var k = c.split(",");
			//var latlng = new google.maps.LatLng(lonn, latt);
		//	var latlng = new google.maps.LatLng(41.543130000000005,-73.0245);
		//	reverseGeocodeVenue(latlng);	
			
				
		//	geocoder.geocode({"latLng": c }, function(results, status){
		//		if (status == google.maps.GeocoderStatus.OK){
		//			for(var j =0; j<results.length;j++){
		//			findVenues(results[j].formatted_address);}
		//		}
		
		if(yesNo>0.5){
			createAMarker(response.routes[0].overview_path[i]);
		}
		}

	}
    
  });
}
function chooseName(){
	var len = venuesData.length;
	var num = Math.random();
	var ranNum = Math.round(len*num);
	var name = venuesData[ranNum];
	return name;
}
function reverseGeocodeVenue(latlng){
	//var latlng = new google.maps.LatLng(41.730330, -72.718506);
	//var latlng = new google.maps.LatLng(lat, lng);
	geocoder.geocode({"latLng": latlng}, function(results, status){
		if (status == google.maps.GeocoderStatus.OK){
			for(var i=0; i<results.length; i++){
				//make a check for lenght of types
				if(results[i].types.length == 2){
					if(results[i].types[0] == "locality" && results[i].types[1] == "political"){
						//document.getElementById("changeme").innerHTML = results[i].formatted_address;
						findVenues(results[i].formatted_address);
					}
				}

			}
			
			
//			for(var i =0; i<results.length;i++){
//			findVenues(results[i].formatted_address);}
		}

	});	
}

	var a = "";

var myBookings = [];
var displayedGig = null;


$(document).ready(function() {
	$('.clickables').keypress(function(e) {
	  	  	if (e.keyCode == '13' &&  this.value != '') {
						$('#Enter').click();
						
	  	  	}
			else{
				document.getElementById("debug").innerHTML = "";
			}

	});

	$('.cities').keypress(function(e) {
	  	  	if (e.keyCode == '13' &&  this.value != '') {
						$('#Enter').click();
	  	  	}
			else{
				document.getElementById("debug").innerHTML = "";
			}

	});

	$("#Enter").click(function(evt) {
		document.getElementById("debug").innerHTML = "";
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
		
		deleteOverlays();

	//	if(cit1!=""){
	//		findVenues(cit1);
	//	}
	//	if(cit2!=""){
	//		findVenues(cit2);
	//	}
	//	if(cit3!=""){
	//		findVenues(cit3);
	//	}
		//findVenuesAlongPath();
		
		//findVenues("Hartford, CT");
		if(bDate != "" && eDate!= "" && genre != null && cap != null && style!= null && origin!="" && dest!=""){
			if(citycount == 1){
			
				findVenues(origin);	//origin, Calcroute, then dest ensure that markers are put in array in the right order
				
				calcRoute();
				//a = a + markersArray.length + "<br />";
				
				findVenues(dest);
				
				//findVenuesAlongPath(); //working for hartford!
				//drawTable();
				//check if length is equal to a count and then displau
				timeMsg();
				//display();
				}
			else if(citycount == 2 && (cit1!="" || cit2 !="" || cit3 != "")){
				findVenues(origin);	
				calcRoute();
				findVenues(dest);
				//drawTable();
				//display();
				timeMsg();
				}
			else if(citycount == 3 && (cit1!="" && cit2!="") || (cit2!="" && cit3!="") || (cit1!="" && cit3!="")){
				findVenues(origin);	
				calcRoute();
				findVenues(dest);
				//drawTable();
		//	display();
		timeMsg();}
			else if(citycount == 4 && cit1!="" && cit2!="" && cit3!=""){
				findVenues(origin);	
				calcRoute();
				findVenues(dest);
				//drawTable();
			//display();
			timeMsg();}
			else{
			/// send warning, this should be in red
				document.getElementById("debug").innerHTML = "Please enter all fields";
			}
		}
		else{
		/// send warning, this should be in red
			document.getElementById("debug").innerHTML = "Please enter all fields";
		}
		

		
	});
//	drawTable();

//	draw();
//	drawButtons();

});

//var numberOfVenues= array.length; //set static for now, but then length pf listOfVenues
var numberOfVenues = 20; //namesList.length;
var namesList = [];
var venuesData = ["Sandy's","Noor's club", "Burlesque Lounge","Larisa's night-club", "Hiba's pub", "Dahlia's coffee house",
"Ammar Ammar", "Gypsy's Bar", "Cure", "House of Blues", "Tao", "Berklee Performance Center", "The Blue Room", "Random Lounge", 
"LAX", "Estate", "FEVER", "The Middle East", "Beehive", "Lala rouge", "Moulin Rouge", "Three Brother's Jazz Bar", 
"The E", "MiddleSex", "The Wedding Planner", "Roses for Ever", "Gypsy Rose", "The College of Music", "The Muesum of Arts", 
"Linda's Private Parties Company", "The Bay", "Royale", "Menes", "Rock and Rose", "Spirit", "Fallen Angel", "George Altos, wedding planner", 
"The Roof", "Little Asia", "Wonder Land", "Joe's Brunch", "Moonlight", "Escape", "Biju", "Fiesta", "Tory Row", "Kevin Bloom", "Serendipity", 
"Jack and Jill", "Judy Jetson", "à la mode", "Nile Lounge", "Lee's Lounge", "Habibi", "The Drake", "Legands of Jazz", "Rock Basement", "Sheer",
"6 Degrees", "Rumor", "Dogma", "Fierce Lounge", "Sundos", "Scorpio", "John Meyer's Center for Performing Arts", "Raja", "The Taj", "The Ritz Lounge", 
"Voltage Cafe", "Blair's Tea Salon", "Monster's Garage", "FATAL", "Inde-Pen-Dence", "Flavors", "Storm", "Athena", "Zues", "El Sabado", 
"Mirage Lounge", "L Nightclub", "Solomon's", "Roger Foldstein Music Center", "Bella", "Sportello", "Sapphire", "Narcissus", 
"Binary", "Paradise", "Lulu's Lounge", "Fire", "Nightingale", "Roman Ruins", "The Apocalypse", "Night and Day", "Elements", 
"Alphred Mayham", "Bobby Brown", "Descartes","Furious", "Angela Been's Lounge"];

function draw(){

//	var canvas = document.getElementById("canvasMoneyBtns");
//	//document.getElementById("debug").innerHTML= "hello"; 
//	var ctx = canvas.getContext('2d');
//	var theSize = 400/5;
//	var theSize2 = 30;
//	
//	
//		for(i=0;i<numberOfVenues+1;i++){
//			
//			ctx.fillStyle = "rgb(0,0,0)";
//			ctx.beginPath();
//			ctx.moveTo(i*theSize,0);
//			ctx.lineTo(i*theSize,numberOfVenues*fixedHeight);
//			ctx.stroke();
//			
//			ctx.fillStyle = "rgb(0,0,0)";
//			ctx.beginPath();
//			ctx.moveTo(0,i*fixedHeight);
//			ctx.lineTo(400,i*fixedHeight);
//			ctx.stroke();
//		
//			
//		}	

}
var allAdvertBtns = [];

/*function get_venue_openings(){
		var venueOpenings = [];
		var venueNames = ["Paradise", "Beehive", "House", "Paradise", "Beehive", "House", "Paradise", "Beehive", "House"];
		
		var allDates = [1, 4, 3, 2, 3, 2, 4, 5, 5];
		
		var startTimes = [10, 15, 18, 19, 20, 10, 23, 22, 4]; 
		var allDur = [40, 20, 30, 70, 20, 120, 60, 30, 40];
		var numOpenings = [5, 4, 2, 3, 2, 4, 5, 5, 5];

		for (var i=0; i<venueNames.length; i++){
				var gig = new Booking(venueNames[i], allDates[i], startTimes[i], i, allDates[i] -1, allDur[i], numOpenings[i]);
				venueOpenings.push(gig);
		}

		return venueOpenings;
		
}

function drawButtons(){
	var venueOpenings = get_venue_openings();
	for (var i=0; i<venueOpenings.length; i++){
			var opening = venueOpenings[i];
			
			allAdvertBtns.push(createButton(opening,i));

		}
	//populate sched table with all buttons created
	var schedulTable = document.getElementById("sched");

}*/

var venueOpenings = [];

function drawTable(){
	var container = document.getElementById("booking");	
	
	//remove old Table
	var oldTable = document.getElementById("sched");
	container.removeChild(oldTable);

	var schedTable = document.createElement("TABLE");
	schedTable.setAttribute("id", "sched");
	var head = document.createElement("THEAD");
	var body = document.createElement("TBODY");
	 // Set the table's border width and colors.
	schedTable.border=1;
	schedTable.bgColor="lightslategray";
	var row, cell;
	var i, j;
	container.appendChild(schedTable);
	schedTable.appendChild(head);
	schedTable.appendChild(body);
	
	 // Insert a row into the header and set its background color.
	  row = document.createElement("TR");
	  head.appendChild(row);
	  head.setAttribute("bgColor","#B6DBD4");

	  cell = document.createElement("TH");
	  cell.style.width = "150px";
	  row.appendChild(cell)
	  
	  // Create and insert cells into the header row.
	  for (i=0; i<dates.length; i++)
	  {
	    cell = document.createElement("TH");
	    cell.innerHTML = dates[i].toDateString();
	    cell.style.width = "150px";
	    row.appendChild(cell);
	  }
	  
	
	  for (i=0; i<markersArray.length; i++)
	  {	   
	    row = document.createElement("TR");
	    body.appendChild(row);
	    for (j=0; j<dates.length + 1; j++){
	    	cell = document.createElement("TD");
	    	if (j==0){
	    	 cell.innerHTML = markersArray[i][1]; 
	    	}
	    	
	    	//create a random booking a third of the time. 
	    	if (j> 0){
	    	emptyBooking = Math.random();
	    	 if (emptyBooking < 0.3){
	    		 //create a booking
	    		 startTime = Math.floor(Math.random() * 14);
	    		 numOpenings = Math.floor(Math.random() * 5);
	    		 duration = Math.floor(Math.random() * 4);
	    		 var gig = new Booking(markersArray[i][1], dates[j-1], startTime + 10, i, j, duration, numOpenings);
	    		 venueOpenings.push(gig);
	    		 
	    		 //then create a button for that gig opening;
	    		 var button = createButton(gig,i, j);
	    		 
	    		 //add button to cell;
	    		 cell.appendChild(button);
	    		 
	    	 }
	    	}
	    	cell.setAttribute("id", i+ "," + j);
	  //    oCell.innerHTML = stock[i][j];
	    	row.appendChild(cell);
	    }
	  }
	  
	/*  // Set the background color of the first body.
	  oTBody0.setAttribute("bgColor","lemonchiffon");
	  oTBody1.setAttribute("bgColor","goldenrod");
	  
	  // Create and insert rows and cells into the footer row.
	  oRow = document.createElement("TR");
	  oTFoot.appendChild(oRow);
	  oCell = document.createElement("TD");
	  oRow.appendChild(oCell);
	  oCell.innerHTML = "Quotes are for example only.";
	  oCell.colSpan = "4";
	  oCell.bgColor = "lightskyblue";
	  
	  // Set the innerHTML of the caption and position it at the bottom of the table.
	  oCaption.innerHTML = "Created using Document Object Model."
	  oCaption.style.fontSize = "10px";
	  oCaption.align = "bottom";*/
	
}
//var VenueList = ["Paradise", "Beehive", "House"];



var toppest = 10;

function createButton(gigOpening, i, j){
	//console.log("making button allegedly");
	
	var bookBtn = document.createElement("button");
	bookBtn.setAttribute("id", "openBtn" + i + "_" + j);
//	bookBtn.setAttribute("class", "moneyBtn");
	bookBtn.className = "openBtn";
	bookBtn.setAttribute("type", "button");
	//bookBtn.type = "button";
//	bookBtn.setAttribute("name", bookBtnInfo.dollars);
	//bookBtn.name = bookBtnInfo.dollars;
	bookBtn.innerHTML = gigOpening.numOpenings;
	bookBtn.label = gigOpening;

	//$("moneyButton" + i, "moneyBtn").click(function() { return false;});


	//TODO figure out position based on venue name + date
//	bookBtn.style.position = "absolute";

//	$(bookBtn).css("position", "absolute");
//	$(bookBtn).css("left", (bookBtnInfo.date-1)*400/5);
//	var topDistance = 0;
//	if(bookBtnInfo.venue == "Paradise"){
//		topDistance = 0;
//	}
//	if(bookBtnInfo.venue == "Beehive"){topDistance=1;}
//	if(bookBtnInfo.venue == "House"){topDistance=2;}
//		bookBtnInfo.top = topDistance*fixedHeight + 5; //+heightt/24
//	$(bookBtn).css("top", topDistance*fixedHeight + 5); // + heightt/24
//	$(bookBtn).css("width", 400/5+ "px");
//	$(bookBtn).css("height", 20 + "px");
//	$(bookBtn).css("z-index", ++toppest);
	return bookBtn;
}

function drawSelectButton(booking){
	/*var btn = document.createElement("button");
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
	return btn;*/
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



