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
	var theSize2 = 60;
	
	
		for(i=0;i<theSize;i++){
			
			ctx.fillStyle = "rgb(0,0,0)";
			ctx.beginPath();
			ctx.moveTo(i*theSize,0);
			ctx.lineTo(i*theSize,300);
			ctx.stroke();
			
			ctx.fillStyle = "rgb(0,0,0)";
			ctx.beginPath();
			ctx.moveTo(0,i*theSize2);
			ctx.lineTo(400,i*theSize2);
			ctx.stroke();
		
			
		}
		//showText();
	
	
}
function make_money_btns(){
		var venueOpenings = [];
		var venueNames = ["Paradise", "Beehive", "House of Blues",
											"Paradise", "Beehive", "House of Blues",
										 "Paradise", "Beehive", "House of Blues"];
		var allDates = [1, 4, 3, 2, 3, 2, 4, 5, 5];
		var startTimes = [10, 15, 18, 19, 20, 10, 23, 22, 4]; 
		var allDur = [40, 40, 40, 40, 40, 40, 40, 40, 40];
		var allDollars = ["$$$", "$$", "$$", "$", "$$", "$", "$$$", "$$", "$"];

		for (var i=0; i<=8; i++){
				var gig = new Booking(venueNames[i], allDates[i], startTimes[i], 
															allDur[i], allDollars[i]);
				venueOpenings.push(gig);
		}

		return venueOpenings;
		
}
function drawButtons(){
	var venueOpenings = make_money_btns();
	for (var i=0; i<venueOpenings.length; i++){
			var button = venueOpenings[i];
			document.getElementById("allMoneyBtns").appendChild(drawButton(button));

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
function drawButton(button){
	//console.log("making button allegedly");
	var bookBtnInfo = button;
	var bookBtn = document.createElement("button");

		
	//var bookBtn = document.createElement("img");
	//bookBtn.setAttribute("src","map.png");
	var canvas = document.getElementById("canvasMoneyBtns");
	bookBtn.setAttribute("id", "moneyBtn" + i);
	bookBtn.setAttribute("class", "moneyBtn");
	bookBtn.className = "moneyBtn";
	bookBtn.setAttribute("type", "button");
	//bookBtn.type = "button";
//	bookBtn.setAttribute("name", bookBtnInfo.dollars);
	//bookBtn.name = bookBtnInfo.dollars;
		bookBtn.innerHTML = bookBtnInfo.dollars;
		bookBtn.setAttribute("value", "hello");//bookBtnInfo.dollars);
//		bookBtn.value = "hello";//bookBtnInfo.dollars;


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
	$(bookBtn).css("top", topDistance*300/5 + 300/24);
	$(bookBtn).css("width", 400/5+ "px");
	$(bookBtn).css("height", 300/10 + "px");
	$(bookBtn).css("z-index", ++toppest);
	return bookBtn;
}

$(function(){
		$(".moneyBtn").button("refresh");
		$(".moneyBtn").click(function() {
				console.log("we clicked");
				console.log(this);
				return false;
		});
});

		
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
