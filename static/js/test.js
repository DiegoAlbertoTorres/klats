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
		
		user.dataPoints = [];
		
		// Hash the person's name
		var hash = Math.abs(user.name.hashCode()).toString(16);
		
		if (users[hash] === undefined){
			// Push first data point to user
			dataPoint.status = $(this).find("div._5t35").html();
			dataPoint.timestamp = d.getTime();
			user.dataPoints.push(dataPoint);
			
			// Push new user to user database
			users[hash] = user;
		}
		// Already in database
		else{
			// Get user data
			user = users[hash];
			
			// Push another data point
			dataPoint.status = $(this).find("div._5t35").html();
			dataPoint.timestamp = d.getTime();
			user.dataPoints.push(dataPoint);
			
			users[hash] = user;
		}
	});
	
	console.log(users);
	
	// Update users
	chrome.storage.local.users = users;
}

function search_name(name) {
	var searchbox = document.getElementsByClassName('inputtext inputsearch textInput');
	click_element(searchbox[0]);
	searchbox[0].value = name;
	var keyEvent = document.createEvent('KeyboardEvent');
	keyEvent.initKeyboardEvent('keydown', true, false, null, 0, false, 0, false, 13, 0);
	searchbox[0].dispatchEvent(keyEvent);
};

