//for now represent pay Amt as string of $ ($, $$ or $$$)
//start time is int on the hour
//dates are 1-# of tour dates for now (where 1 is first day of tour)

var Booking = function(venueName, date, startTime, row, col, duration, numOpenings){
		this.venue = venueName;
		this.date = date;
		this.startTime = startTime;
		this.row = row;
		this.col = col;
		this.duration = duration;
		this.numOpenings = numOpenings;
		this.color = assignColor(venueName);
		this.top = 0; //assigned later
		this.left = (date-1)*400/5;

		this.toString = function(){
				var name = this.venue + this.date;
				return name;
		}
}

function assignColor(venueName){

		if(venueName == "Beehive"){
			return "green";
		}
		if(venueName == "House"){
			return "blue";
		}
		if(venueName == "Paradise"){
			return "red";
		}
}