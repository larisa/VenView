

function addDays(dayID){
	for(var count=1; count<32; count++){
		var innerText = document.createTextNode(count);
		var day = document.createElement("option");
		day.appendChild(innerText);
		document.getElementById(dayID).appendChild(day);	
	}
}
$(document).ready(function() {
	addDays("daysB");
	addDays("daysE");

	
});
$("#Enter").click(function(evt) {
	document.getElementById('#Column2').style.visibility="visible";
});
