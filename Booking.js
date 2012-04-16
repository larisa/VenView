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
		this.top = 0;
		this.left = 0;

		this.toString = function(){
				var name = this.venue + this.date;
				return name;
		}
}

function assignColor(venueName){
		return "#30B0DV";
}