$(document).ready(function(){
	// Initialize tracked friends
	chrome.storage.local.users = {};
	chrome.storage.local.trackedFriends = {};
	
	$("#tags").keypress(function(e) {
		if(e.which == 13) {
			grab_user();
		}
	});
	
	$("#addFriend").click(function() {
		grab_trackedFriend();
	});
	
	$("#removeFriend").click(function() {
		release_trackedFriend();
	});
});

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
		$("#tags").autocomplete({
			source: users
		});
		
		// See if anyone tracked got online
		checkTracked(request.data);
	}
	if (request.method == "getLocalStorage"){
		// Reply
		sendResponse({data: chrome.storage.local.users});
	}
});

function checkTracked(onlineFriends){
	console.log(onlineFriends);
	var trackedFriends = chrome.storage.local.trackedFriends;
	
	// For each tracked friend
	for (i in trackedFriends){
		if (onlineFriends[i] !== undefined)
			console.log("he is online!");
	}
}

function makeDataSeries(dataPoints){
	var dataSeries = [];
	
	var i, j;
	for (i = 0; i < 7; ++i){
		for (j = 0; j < 24; ++j){
			dataSeries.push([j, i, dataPoints[i][j]]);
		}
	}
	
	return dataSeries;
}

function unhash_users(){
  var names = [];
  var users = chrome.storage.local.users;
  for (u in users){
      names.push(users[u].name);
  }
  return names;
}

function user_hashes(users){
  var hashes = [];
  for (u in users){
      hashes.push(u);
  }
  return hashes;
}

function grab_trackedFriend(){
	var name = $("#tags").val();
	
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

function release_trackedFriend(){
	var name = $("#tags").val();
	
	var hash = Math.abs(name.hashCode()).toString(16);
	
	delete chrome.storage.local.trackedFriends[hash]
	
	//~console.log(hash, friend);
	console.log(chrome.storage.local.trackedFriends);
	return;
}

function grab_user(){
	var name = $("#tags").val();
	
	if (name == "Randomaldo Falso"){
		var friend = generate_dataset();
	}
	else{
		var hash = Math.abs(name.hashCode()).toString(16);
		var friend = chrome.storage.local.users[hash];
	}
	
	drawGraph(friend);
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

function drawGraph(friend){
	 options = {
        chart: {
            type: 'heatmap',
            marginTop: 40,
            marginBottom: 40
        },


        title: {
            text: friend.name
        },

        xAxis: {
			title: {
                text: "Hour"
            },
            labels: {
                format: '{value}:00'
            },
            minPadding: 0,
            maxPadding: 0,
            startOnTick: false,
            endOnTick: false,
            tickPositions: [0, 6, 12, 18, 24],
            tickWidth: 1,
            min: 0,
            max: 23
        },

        yAxis: {
            categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            title: null
        },

        colorAxis: {
            min: 0,
            minColor: '#FFFFFF',
            maxColor: '#FF2D00'
        },

        legend: {
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            y: 25,
            symbolHeight: 320
        },
		tooltip: {
			enabled: false
		},
        //~tooltip: {
            //~formatter: function () {
                //~return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
                    //~this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
            //~}
        //~},

        series: [{
			//~color: "#ff0000",
            borderWidth: 1,
            // Data is an array of arrays. Each element has form: [Hour, day, value]
            data: [],
        }]

    };
    options.series[0].data = makeDataSeries(friend.dataPoints);
	$('#container').highcharts(options);
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




