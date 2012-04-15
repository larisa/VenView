function addDays(dayID){
	for(var count=1; count<32; count++){
		var innerText = document.createTextNode(count);
		var day = document.createElement("option");
		day.appendChild(innerText);
		document.getElementById(dayID).appendChild(day);	
	}
}
var display = function(){
	document.getElementById("Column2").style.visibility="visible";
}
var heightt = 250;
var citycount = 1;
var cityNum = 0;
function dosomething(){
	$("#city_"+cityNum).after(
		'<tr id="city_'+citycount+'"><td class = "cities"><input type= "text"/></td></tr>'
	);
	citycount++;
	cityNum++;
}

var myBookings = [];
var displayedGig = null;


$(document).ready(function() {
	//addDays("daysB");
	//addDays("daysE");
	$("#Enter").click(function(evt) {
		display();
	});
		//drawSched();
		draw();
		drawButtons();
//	$("#c2").click(function(evt) {
//		var mX = evt.pageX - this.offsetLeft;
//		var mY = evt.pageY- this.offsetTop;
//	}):
		//showText();

});



//$("#c2").addEventListener('click', function(e){
//		console.log('click: ' + e.offsetX + '/' + e.offsetY);
//		console.log("displayedGIg");
//		console.log(displayedGig);
//		if (displayedGig == null) {return; }
	//	var mX = e.pageX - this.offsetLeft;
	//	var mY = e.pageY- this.offsetTop;

	//			if (mX >= displayedGig.left+35 && mX <= displayedGig.left + (400/5) + 35 &&
	//					mY >= displayedGig.duration && mY <= displayedGig.duration+length){
					//	console.log("clicking in the rectangle");

					//	var canvas = document.getElementById("canvasMoneyBtns2");

					//	canvas.width = canvas.width;
					//	$('.moneyBtn').attr('disabled', false);
					//	myBookings.push(displayedGig);
					//	displayedGig = null;

						//$(canvasMoneyBtns2).css("z-index", 101);
						//$(canvasMoneyBtns).css("z-index", 100);
			//	}

//}, false);
var numberOfVenues= 5; //set static for now, but then length pf listOfVenues

function draw(){
	var canvas = document.getElementById("canvasMoneyBtns");
	var ctx = canvas.getContext('2d');
	var theSize = 400/5;
	var theSize2 = heightt/5;
	
	
		for(i=0;i<numberOfVenues+1;i++){
			
			ctx.fillStyle = "rgb(0,0,0)";
			ctx.beginPath();
			ctx.moveTo(i*theSize,0);
			ctx.lineTo(i*theSize,heightt);
			ctx.stroke();
			
			ctx.fillStyle = "rgb(0,0,0)";
			ctx.beginPath();
			ctx.moveTo(0,i*theSize2);
			ctx.lineTo(400,i*theSize2);
			ctx.stroke();
		
			
		}
		//showText();
	
	
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
	//ctx.fillStyle = '#f00';
	ctx.font = 'bold 12px sans-serif';
	cxt.textAlign = "left";
	ctx.textBaseline = "top";
	

	for(var i=0; i<VenueList.length; i++){
//		ctx.fillText(VenueList[i],0,(i+1)*(400/5)+(400/24));
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
		bookBtnInfo.top = topDistance*heightt/5 + heightt/24;
	$(bookBtn).css("top", topDistance*heightt/5 + heightt/24);
	$(bookBtn).css("width", 400/5+ "px");
	$(bookBtn).css("height", heightt/10 + "px");
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



