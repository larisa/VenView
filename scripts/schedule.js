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
function venMsg()
{
var t=setTimeout("divideVenues(5)",500);
}


var display = function(){
	document.getElementById("Column2").style.visibility="visible";
	document.getElementById("Column3").style.visibility="visible";

	divideVenues(dates.length);
	showDayMarkers(0);
	drawList(0);
	document.getElementById("dateToDay").innerHTML = dates[0].toDateString();

}
// Begin of order cities input fields fucntions, for input 
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
/// End of city behavior functions


/// Begin of Google Maps code
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
	google.maps.event.addListener(map, 'click', function() {
      infowindow.close();
		if(bufferMarker){
			bufferMarker.styleIcon.set("color","#20b2aa");}
    });

}


/// End of Google Maps code

/// Begin of Data accumelation code

function findVenues(location){
	geocoder.geocode({"address": location}, function(results, status){
		if (status == google.maps.GeocoderStatus.OK){
			var c = results[0].geometry.location;
			var request = {
	          location: c,
	          radius: 500, //change radius later
	          types: ['food']
	        };
	        var service = new google.maps.places.PlacesService(map);
	        service.search(request, callback);
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

		var len = venuesData.length;
		var num;
		var ranNum;

		var na; 

		for (var i = 0; i < response.routes[0].overview_path.length-10; i=i+10) {

			var yesNo = Math.random();

		if(yesNo>0.5){
			createAMarker(response.routes[0].overview_path[i]);
		}
		}

	}
    
  });
}

/// End of Data accumelation code

/// Begin of Data distribution code
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

function chooseName(){
	var len = venuesData.length-1;
	var num = Math.random();
	var ranNum = Math.round(len*num);
	var name = venuesData[ranNum];
	return name;
}

function showDayMarkers(day){
	//hide markers that are not in that day and show ones that are
	if (markersArray) {
    for (i in markersArray) {
      markersArray[i][0].setVisible(false); //hide
    }
	}
	for(i in venuesPerDay[day]){
		letThereBeLight(venuesPerDay[day][i][0], venuesPerDay[day][i][1], venuesPerDay[day][i]);
	}

	for(i in bookings){
		permanentMarkers(bookings[i].latlng,bookings[i].venue);
	}
	document.getElementById("dateToDay").innerHTML = dates[day].toDateString();
}
function divideVenues(numberOfDays){
	for(var i =0; i<numberOfDays; i++){
		var dayArray = perDay();
		divMsg();
		venuesPerDay.push(dayArray);
	}
}
function perDay(){
	var arrayish = [];
	var len = namesList.length;
	for(var i =0; i<len; i++){
		var num = Math.random();
		if(num < 0.3){
			arrayish.push(namesList[i]);
		}
	}
	return arrayish;

}
function divMsg()
{
var t=setTimeout("doNothing()",500);
}

function doNothing(){

}
var daycount = 0;
var a = "";
var myBookings = [];
var displayedGig = null;

function breakMsg()
{
var t=setTimeout("calcroute()",500);
}
function breakMsg2(dest)
{
var t=setTimeout("findVenues(dest)",500);
}

//// End of data distribution code

///Begin of markers code
var styleIconClass = new StyledIcon(StyledIconTypes.CLASS,{color:"#20b2aa"});
var styleIconClass2 = new StyledIcon(StyledIconTypes.CLASS,{color:"#0000ff"});
var bufferMarker;
var markersArray = []; 
var venuesPerDay = []; // an array of arrays, each array being the day 
var namesTaken = [];
function createAMarker(latlng) {
	var name;
	var boo = true;
	name = chooseName();
	while(boo){
		if(name in namesTaken){
			name = chooseName();
		}
		else{
			namesTaken.push(name);
			namesList.push([latlng, name]);
			boo = false;
		}
	}
}
function createMarker(place) {
  var placeLoc = place.geometry.location;
	namesList.push([placeLoc,place.name]);

}




///Similar marker and link behavior
function showVenuMap(marker, name){
	if(bufferMarker){
		bufferMarker.styleIcon.set("color","#20b2aa");
		bufferMarker = marker;
	}else{
		bufferMarker = marker; //is this right. marker is type, no?
	}
	infowindow.setContent('<div id="information">'+name+'</div>');
    infowindow.open(map, marker);
	marker.styleIcon.set("color","#00ff00");
}
function permanentMarkers(latlng, name){
	var marker = new StyledMarker({styleIcon:new StyledIcon(StyledIconTypes.MARKER,{},styleIconClass2),position:latlng,map:map});
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent('<div id="information">'+name+'</div>');
	    infowindow.open(map, marker);
  });
	google.maps.event.addListener(infowindow, 'closeclick', closeMarker);
	markersArray.push([marker, name]);
}
function letThereBeLight(latlng, name, venue){
	var marker = new StyledMarker({styleIcon:new StyledIcon(StyledIconTypes.MARKER,{},styleIconClass),position:latlng,map:map});
	bufferMarker = marker;
	google.maps.event.addListener(marker, 'click', function() {
		showListing(marker, name);
		move_up(marker.position);
  });
	google.maps.event.addListener(infowindow, 'closeclick', closeMarker);
	venue.push(marker);
	markersArray.push([marker,name]);
  
}
function closeMarker(){
	if(bufferMarker){
		bufferMarker.styleIcon.set("color","#20b2aa");
	}

	if(tempRow){
		tempRow.style.display = "none";
		tempIcon.setAttribute("class" ,"icon-chevron-right");
		tempRow = null;
		tempIcon = null;
		
	}
}

function deleteOverlays() {
  if (markersArray) {
    for (i in markersArray) {
	markersArray[i][0].setVisible(false);
    }
    markersArray.length = 0;
	namesList.length = 0; //check if this was removed
	venuesPerDay.length = 0;
	bookings.length= 0;
	daycount = 0;
	permanantOnes.length = 0;
	namesTaken.length = 0;
	document.getElementById("ArrowBackward").disabled = true;
	document.getElementById("ArrowForward").disabled = false;
	document.getElementById("finishSched").disabled = true;
	bookings = [];
  }
}

////End of markers code


///Begin of listings code

var venueOpenings = [];
var bookings = [];
var tempRow;
var tempIcon;

generateTriggerCallback = function (object, name){
	return function (){ 
		showListing(object,name);
	}
}

function showListing(object, name){
	var row = document.getElementById(daycount+","+name+"0");
	var icon = document.getElementById(daycount+ "," + name + "icon");
		if(tempRow){
			if(tempRow!= row){
				tempRow.style.display = "none";
				tempIcon.setAttribute("class" ,"icon-chevron-right");				
				}
			}

	tempRow = row;
	tempIcon = icon;	
      if (row.style.display == "block"){
    	  row.style.display = "none";
    	  icon.setAttribute("class" ,"icon-chevron-right");
    	  google.maps.event.trigger(map, 'click');

      }
      else {
    	  row.style.display = "block";
    	  icon.setAttribute("class" ,"icon-chevron-down");
    	  showVenuMap(object, name);
      }
}

//takes the latlng of a marker and uses it to construct the id of the row element
//in the list that shows the availability of bookings. 
//params: latlng
//constructed id: currentday,latlng
//finds the offset of the element in its parent element + offset of parent to know
//where to scroll to. 
function move_up(latlng) {
	var sTr = daycount+"," +latlng;
	var topPos = document.getElementById(sTr).offsetTop;
	document.getElementById('booking').scrollTop = topPos;
  }


function drawList(day){
	var container = document.getElementById("booking");	
	var oldTable = document.getElementById("sched");
	container.removeChild(oldTable);
	var schedTable = document.createElement("TABLE");
	schedTable.setAttribute("id", "sched");
	var body = document.createElement("TBODY");
	schedTable.border=1;
	schedTable.bgColor="lightslategray";
	var row, cell;

	container.appendChild(schedTable);
	schedTable.appendChild(body);

	 // Insert a row into the header and set its background color

	  for (i=0; i<venuesPerDay[day].length; i++){	   

		row = document.createElement("TR");
		body.appendChild(row);
		if (i%2 == 0){
		    row.style.backgroundColor = "#F0F0F0";}
		else {
		    row.style.backgroundColor = "white";}


	    var latlong = venuesPerDay[day][i][0];
	    var name =  venuesPerDay[day][i][1];
	    var marker = venuesPerDay[day][i][2];

	    cell = document.createElement("TD");
	    row.appendChild(cell);    

	    icon = document.createElement("I");
	    cell.appendChild(icon);
	    icon.setAttribute("class", "icon-chevron-right");
	    icon.setAttribute("id", day+ "," +name +"icon");

	    link = document.createElement("A");
	    cell.appendChild(link);


	    link.innerHTML = name;
	    link.href = 'javascript:void(0);';

	    cell.setAttribute("id", day+ "," + latlong);
	    cell.setAttribute("class", "venue");

	    row = document.createElement("TR");
	    body.appendChild(row);

	    row.setAttribute("id",day+ "," +name +"0");
		row.setAttribute("class", "openings");
		row.style.display = "none";

		cell.onclick = generateTriggerCallback(marker,name); 


	    cell = document.createElement("TD");
	    row.appendChild(cell);  


	    booking = createOpenings(day, name, latlong);
	    for (j=0;j<booking.length;j++){
	    	cell.appendChild(booking[j]);
	    }

	    }
}
/// End of listings code

//// Begin of bookings create code

function createOpenings(day, venueName, latlng){
	listOfDivs = [];
	numOpenings = Math.floor(Math.random() * 4);
	div = document.createElement("DIV");
	div.setAttribute("class", "booking");
	div.innerHTML = "availableItems"
	for (k=0; k<=numOpenings; k++){
		startTime = Math.floor(Math.random() * 14) + 10;
		duration = Math.floor(Math.random() * 4);
		gigDiv = createGig(venueName, day, startTime, duration, latlng)
		listOfDivs.push(gigDiv);
	}
	return listOfDivs;

}

permanantOnes =[]; //maybe later [marker, count#bookings]
function createGig(venueName, date, startTime, duration, latlng){
	var gig = new Booking(venueName, date, startTime,  duration, latlng);

	div = document.createElement("DIV");
	div.setAttribute("class", "gig");
	div.setAttribute("id", gig);
	endTime = startTime + duration;
	div.innerHTML ="Available from " + startTime + ": " +  endTime;
	toBookLink = document.createElement("A");
	div.appendChild(toBookLink);
	toBookLink.innerHTML = "Book this time";
	toBookLink.href = 'javascript:void(0);';
	toBookLink.onclick =  function (){
		bookings.push(gig);
		gig.book();
		bufferMarker.styleIcon.set("color","#0000ff");
		permanantOnes.push(bufferMarker); //maybe later something else. up to you
		bufferMarker = null;
		if(bookings.length>0){
			document.getElementById("finishSched").disabled = false;
		}
	}
	return div;

}
 
//// End of bookings create code



// Docuemnt Ready Function
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
	$("#ArrowForward").click(function(evt) {
		daycount++;
		document.getElementById("ArrowBackward").disabled = false;
		showDayMarkers(daycount);
		drawList(daycount);
		if(daycount === dates.length-1){
			//disable button
			this.disabled=true;
		}
		infowindow.close();
			if(bufferMarker){
				bufferMarker.styleIcon.set("color","#20b2aa");}
	});
	$("#ArrowBackward").click(function(evt) {
		daycount--;
		document.getElementById("ArrowForward").disabled = false;
		drawList(daycount);
		showDayMarkers(daycount);
		if(daycount === 0){
			this.disabled=true;
			//disable button
		}
		infowindow.close();
			if(bufferMarker){
				bufferMarker.styleIcon.set("color","#20b2aa");}

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
					//origin, Calcroute, then dest ensure that markers are put in array in the right order
				findVenues(origin);
				calcRoute();
				findVenues(dest);

				timeMsg();
				}
			else if(citycount == 2 && (cit1!="" || cit2 !="" || cit3 != "")){
				findVenues(origin);	
				calcRoute();
				findVenues(dest);
				timeMsg();
				}
			else if(citycount == 3 && (cit1!="" && cit2!="") || (cit2!="" && cit3!="") || (cit1!="" && cit3!="")){
				findVenues(origin);	
				calcRoute();
				findVenues(dest);
				timeMsg();
				}
			else if(citycount == 4 && cit1!="" && cit2!="" && cit3!=""){
				findVenues(origin);	
				calcRoute();
				findVenues(dest);
				timeMsg();
				}
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
});