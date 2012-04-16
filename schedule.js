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

$(document).ready(function() {
	addDays("daysB");
	addDays("daysE");
	$("#Enter").click(function(evt) {
		display();
	});
		//drawSched();
		draw();
		drawButtons();
		//showText();
});

function draw(){
	var canvas = document.getElementById("canvasMoneyBtns");
	var ctx = canvas.getContext('2d');
	var theSize = 400/5;
	var theSize2 = heightt/5;
	
	
		for(i=0;i<theSize;i++){
			
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
		var venueNames = ["Paradise", "Beehive", "House of Blues",
											"Paradise", "Beehive", "House of Blues",
										 "Paradise", "Beehive", "House of Blues"];
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

function showText() {
	var cxt = document.getElementById("allMoneyBtns").getContext('2d');
	//ctx.fillStyle = '#f00';
	ctx.font = 'bold 12px sans-serif';
	cxt.textAlign = "left";
	ctx.textBaseline = "top";
	var VenueList = ["Paradise", "Beehive", "House of Blues"];

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
	if(bookBtnInfo.venue == "House of Blues"){topDistance=2;}
	$(bookBtn).css("top", topDistance*heightt/5 + heightt/24);
	$(bookBtn).css("width", 400/5+ "px");
	$(bookBtn).css("height", heightt/10 + "px");
	$(bookBtn).css("z-index", ++toppest);
	return bookBtn;
}

$(function(){
		$(".moneyBtn").button();
		$(".moneyBtn").click(function() {
				var currBooking = this.label;
				console.log(currBooking);
				drawSchedule(currBooking);
				return false;
		});
});

//takes Booking object of moneyBtn that was clicked
function drawSchedule(selBooking){
		console.log(selBooking);
		var canvas = document.getElementById("canvasMoneyBtns");

		var context = canvas.getContext("2d");
		//open booking rectangle block proportional to its duration
		var length = selBooking.duration;
		var width = selBooking.duration;
		console.log("length:" + length + "width" + width);
		context.fillStyle = "red";
		context.fillRect(20, 20, length, width);
		console.log(context);

}
		
//for now represent pay Amt as string of $ ($, $$ or $$$)
//start time is int on the hour
//dates are 1-# of tour dates for now (where 1 is first day of tour)

var Booking = function(venueName, date, startTime, duration, payAmt){
		this.venue = venueName;
		this.date = date;
		this.startTime = startTime;
		this.duration = duration;
		this.dollars = payAmt;
		this.color = assignColor(venueName);

		this.toString = function(){
				var name = this.venue + this.date;
				return name;
		}
}

function assignColor(venueName){
		return new color("#30B0DV");
}
