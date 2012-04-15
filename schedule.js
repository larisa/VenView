function addDays(){
	for(var count = 1; var<32; count++){
		var innerText = document.createTextNode(count);
		var day = document.createElement("option");
		day.appendChild(innerText);
		document.getElementById("days").appendChild(day);	
	}
}
$(document).ready(function() {
	addDays();
	
});
$("#Enter").click(function(evt) {
	document.getElementById('#Column2').style.visibility="visible";
});
