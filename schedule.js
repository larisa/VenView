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
		make_money_btns();
});

function drawSched(canvas, canvas2){
	var ctx = canvas.getContext('2d');
	//var theSize = $.getUrlVar('size') ? $.getUrlVar('size') : DEFAULT_BOARD_SIZE;
	var blockSize = 400/6;
//	for(j=0;j<theSize;j++){
//		for(i=0;i<theSize;i++){
//			if((j%2==0 && i%2!=0)||(j%2!=0 && i%2==0)){
//				ctx.fillStyle = "rgb(0,0,0)";
//			}
///			else{
//				ctx.fillStyle = "rgb(255,255,255)";
//				
//			}
//			ctx.fillRect (i*blockSize,j*blockSize, blockSize, blockSize);
//		}
//	}
	
}
function make_money_btns(){
		var venueOpenings = [9];
		var venueNames = ["Paradise", "Beehive", "House of Blues",
											"Paradise", "Beehive", "House of Blues",
										 "Paradise", "Beehive", "House of Blues"];
		var allDates = [1, 4, 3, 2, 3, 2, 4, 5, 5];
		var startTimes = [10, 15, 18, 19, 20, 10, 23, 22, 4]; 
		var allDur = [40, 40, 40, 40, 40, 40, 40, 40, 40];
		var allDollars = ["$$$", "$$", "$$", "$", "$$", "$", "$$$", "$$", "$"];

		for (var i=0; i<=9; i++){
				var gig = new Booking(venueNames[i], allDates[i], startTimes[i], 
															allDur[i], allDollars[i]);
				venueOpenings.push(gig);
		}
		for (var i=0; i<venueOpenings.length; i++){
				console.log("making button allegedly");
				var bookBtnInfo = venueOpenings[i];
				var bookBtn = document.createElement("button");
				var canvas = document.getElementById("canvasMoneyBtns");
				bookBtn.id = "moneyBtn" + i;
				bookBtn.className = "moneyBtn";
				bookBtn.className = "ui-button-text";
				bookBtn.type = "button";
				bookBtn.name = "hello";
				bookBtn.value = "hello";

/*
				$("button", ".moneyBtn").click(function() { 
						window.console.log("clicked the button dude");
						return false;
				});
				$(".moneyBtn").button({ label: "hello"});
				//getter
				var label = $( ".moneyBtn" ).button( "option", "label" );
				//setter
				$( ".moneyBtn" ).button( "option", "label", "custom label" );
*/

				//TODO figure out position based on venue name + date
				bookBtn.style.position = "absolute";
				
				bookBtn.style.height = 20 + "px";
				bookBtn.style.width = 400/6 + "px";
				//bookBtn.style.top = + "px";
				//bookBtn.style.left = + "px";
//				bookBtn.style.background-color = bookBtnInfo.color;
				$(bookBtn).css("position", "absolute");
				$(bookBtn).css("left", $(canvas).offset().left + bookBtnInfo.date*400/6);
				var topDistance = 0;
				if(bookBtnInfo.venue == "Paradise"){
					topDistance = 1;
				}
				if(bookBtnInfo.venue == "Beehive"){topDistance=2;}
				if(bookBtnInfo.venue == "House of Blues"){topDistance=3;}
				

				
				$(bookBtn).css("top", $(canvas).offset().top + topDistance*400/6);		
				allMoneyBtns.appendChild(bookBtn);

				}

}

$(function(){
		console.log("in function with jquery bs");
				$("button", ".moneyBtn").click(function() { 
						console.log("clicked the button dude");
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
