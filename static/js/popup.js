if (chrome.storage.local.firstRun === undefined){
	console.log("first run!");
	chrome.storage.local.users = {};
	chrome.storage.local.trackedFriends = {};
	chrome.storage.local.firstRun = false;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// Receive list of online users and their weight
    if (request.method == "setLocalStorage"){
		
		// Store message
		chrome.storage.local.users = request.data;
		
		// Reply
		sendResponse({});
		
		// Add to the search dropdown
		var users = unhash_users();
		users.push("Randomaldo Falso");
		
		// See if anyone tracked got online
		checkTracked(request.online);
	}
	else if (request.method == "getLocalStorage"){
		// Reply
		sendResponse({data: chrome.storage.local.users});
	}
	else if (request.method == "addFriend"){
		sendResponse({});
		grab_trackedFriend(request.data);
	}
	else if (request.method == "removeFriend"){
		console.log("Added new tracked person!");
		sendResponse({});
		release_trackedFriend(request.data);
	}
	else if (request.method == "listRequest"){
		sendResponse({users: chrome.storage.local.users});
	}
	else if (request.method == "friendRequest"){
		sendResponse({friend: chrome.storage.local.users[request.hashCode]});
	}
	else if (request.method == "setYoUser"){
		chrome.storage.local.youser = request.youser;
		sendResponse({});
		
		send_yo(chrome.storage.local.youser);
	}
});

function checkTracked(onlineFriends){
	console.log(onlineFriends);
	var trackedFriends = chrome.storage.local.trackedFriends;
	
	// For each tracked friend
	for (i in trackedFriends){
		console.log(trackedFriends[i].name, trackedFriends[i].online);
		// If tracked friend is online
		if (onlineFriends[i] !== undefined){
			// And he was offline
			if (trackedFriends[i].online == false){
				trackedFriends[i].online = true;
				if (chrome.storage.local.youser !== undefined)
					send_yo(chrome.storage.local.youser);
			}
		}
		// If tracked friend is offline
		else{
			// And he was online
			if (trackedFriends[i].online == true){
				trackedFriends[i].online = false;
			}
		}
	}
}

function user_hashes(users){
  var hashes = [];
  for (u in users){
      hashes.push(u);
  }
  return hashes;
}

function grab_trackedFriend(name){
	
	if (name == "Randomaldo Falso"){
		var friend = generate_dataset();
	}
	else{
		var hash = Math.abs(name.hashCode()).toString(16);
		var friend = chrome.storage.local.users[hash];
	}
	
	chrome.storage.local.trackedFriends[hash] = {
		name: friend.name,
		online: false
	};
	
	//~console.log(hash, friend);
	console.log(chrome.storage.local.trackedFriends);
	return;
}

function release_trackedFriend(name){
	
	var hash = Math.abs(name.hashCode()).toString(16);
	
	delete chrome.storage.local.trackedFriends[hash]
	
	//~console.log(hash, friend);
	console.log(chrome.storage.local.trackedFriends);
	return;
}



//generates random dataset
function generate_dataset(name){
    var day = []; //size 7
    var name = "Randomaldo Falso";
    
    for (j = 0; j < 7; j++) {
        var hour = []; //size 24
        for (q = 0; q < 24; q ++) {
            hour.push(Math.floor((Math.random() * 10)));
        }
        day.push(hour);
    }
    
    for (j = 17; j < 24; j++){
		day[5][j] += Math.floor((Math.random() * 50));
		day[6][j] += Math.floor((Math.random() * 50));
	}
	
	for (i = 1; i < 5; i++){
		for (j = 9; j < 15; j++){
			day[i][j] += Math.floor((Math.random() * 20));
		}
	}
    
    var friend = {
        dataPoints: day,
        name: name
    };
    
    return friend;
}

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

function send_yo(user) {
	console.log("SENDING YO!!!");
	var username = user;

	var http = new XMLHttpRequest();
	var url = "http://api.justyo.co/yo/";
	var params = "api_token=ca0f793f-5094-4c91-b407-ec09e2204f22&username=" + username;
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Content-length", params.length);
	http.setRequestHeader("Connection", "close");

	http.onreadystatechange = function() {//Call a function when the state changes.
	    if(http.readyState == 4 && http.status == 200) {
	        console.log(http.responseText);
	    }
	};

	http.send(params);
}

function unhash_users(users){
  var names = [];
  for (u in users){
      names.push(users[u].name);
  }
  return names;
}


