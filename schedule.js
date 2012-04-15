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


function make_money_btns(){
		console.log("in make money btns");
		var venueOpenings = [9];
		var venueNames = ["Paradise", "Beehive", "House of Blues",
											"Paradise", "Beehive", "House of Blues",
										 "Paradise", "Beehive", "House of Blues"];
		var allDates = [1, 4, 3, 2, 3, 2, 4, 5, 5];
		var startTimes = [10, 15, 18, 19, 20, 10, 23, 22, 4]; 
		for (var i=0; i<=9; i++){
				var gig = new Booking(venueNames[i], allDates[i], startTimes[i], 
															allDur[i], allDollars[i]);
				venueOpenings.push(gig);
		}
		for (var i=0; i<venueOpenings.length; i++){
				var bookBtnInfo = venueOpenings[i];
				var bookBtn = new span();
				bookBtn.id = "moneyBtn" + i;
				bookBtn.className = "moneyBtn";
				bookBtn.type = "button";
				bookBtn.name = bookBtnInfo.dollars;

				//TODO figure out position based on venue name + date
				bookBtn.style.position = "absolute";
				//bookBtn.style.height = ;
//				bookBtn.style.width = 75%;
				//bookBtn.style.top = + "px";
				//bookBtn.style.left = + "px";
				bookBtn.style.background-color = bookBtnInfo.color;
						
				allMoneyBtns.appendChild(nextBtn);

				}

}
		
