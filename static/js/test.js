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

window.onload = function() {
	//~chrome.storage.local.users = {};
	if (chrome.storage.local.users === undefined)
		chrome.storage.local.users = {};
		
	//~chrome.storage.local.users=	{};
	//~console.log("Clear!");
		
	setInterval(scrape, 5000);
};

function scrape(){
	var d = new Date();
	
	var users = chrome.storage.local.users;
	
	$("._42fz").each(function(){
		var user = {};
		var dataPoint = {};
		
		// User name
		user.name = $(this).find("div._55lr").html();
		
		// Hash the person's name
		var hash = Math.abs(user.name.hashCode()).toString(16);
		
		// Data is an array of arrays. Each element has form: [Hour, day, value]
		if (users[hash] === undefined){
			
			user.dataPoints = [];
			
			// Push first data point to user
			var status = $(this).find("div._5t35").html();
			var value;
			if (status == "Web"){
				value=1;
			}
			else if (status == "Mobile"){
				value = 0.5;
			}

			user.dataPoints.push([d.getHours(), d.getDay(), value]);
			
			// Push new user to user database
			users[hash] = user;
		}
		// Already in database
		else{
			var status = $(this).find("div._5t35").html();
			var value;
			if (status == "Web"){
				value = 1;
			}
			else if (status == "Mobile"){
				value = 0.5;
			}
			
			users[hash].dataPoints.push([d.getHours(), d.getDay(), value]);
		}
	});
	
	console.log("Sending data.");
	console.log(users);
	chrome.runtime.sendMessage({method: "setLocalStorage", data: users}, function(response) {
		console.log("Response received.");
	});
}


