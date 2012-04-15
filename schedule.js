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
function dosomething(){

//	var newC = document.createElement("input");
//	newC.setAttribute("id", "city_"+citycount);
	
//	newC.setAttribute("type", "text");
	$("#Origin").after(
		'</td></tr><tr><td>'+ '<input id="city_'+citycount + '" type="text"></input>' +
		'</td></tr>'
		);
		citycount++;
}
$(document).ready(function() {
	addDays("daysB");
	addDays("daysE");
	$("#Enter").click(function(evt) {
		display();
	});

	
});
