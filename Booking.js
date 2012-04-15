//for now represent pay Amt as string of $ ($, $$ or $$$)
//start time is int on the hour
//dates are 1-# of tour dates for now (where 1 is first day of tour)
var Booking = function(venueName, date, startTime, duration, payAmt){
		this.venue = venueName;
		this.startTime = startTime;
		this.duration = duration;
//		this.dollars = payAmt;
		this.dollars = "$$$";
		this.color = assignColor(venueName);
}

function assignColor(venueName){
		return #30B0DV;
}