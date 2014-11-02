String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length == 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

var users;

window.onload = function() {
	chrome.runtime.sendMessage({method: "getLocalStorage"}, function(response) {
		users = response.data;
		setInterval(scrape, 1000);
	});
};

function scrape(){
	var d = new Date();
	
	$("._42fz").each(function(){
		var user = {};
		var dataPoint = {};
		
		// User name
		user.name = $(this).find("div._55lr").html();
		
		// Hash the person's name
		var hash = Math.abs(user.name.hashCode()).toString(16);
		
		// Data is an array of arrays. Each element has form: [Hour, day, value]
		if (users[hash] === undefined){
			var dataPoints = new Array(7);
			for (var i = 0; i < 7; i++) {
				dataPoints[i] = Array.apply(null, new Array(24)).map(Number.prototype.valueOf,0);
			}
			user.dataPoints = dataPoints;
			
			// Push first data point to user
			var status = $(this).find("div._5t35").html();
			var value = 0;
			if (status == "Web"){
				value = 2;
			}
			else if (status == "Mobile"){
				value = 1;
			}
			
			user.dataPoints[d.getDay()][d.getHours()] = value;
			
			// Push new user to user database
			users[hash] = user;
			
		}
		// Already in database
		else{
			var status = $(this).find("div._5t35").html();
			var value = 0;
			if (status == "Web"){
				value = 2;
			}
			else if (status == "Mobile"){
				value = 1;
			}
			
			users[hash].dataPoints[d.getDay()][d.getHours()] += value;
		}
	});
	
	console.log("Sending data.");
	console.log(users);
	chrome.runtime.sendMessage({method: "setLocalStorage", data: users}, function(response) {
		console.log("Response received.");
	});
}


