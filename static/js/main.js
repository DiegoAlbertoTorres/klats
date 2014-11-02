$(document).ready(function(){
	$("#tags").keypress(function(e) {
		if(e.which == 13) {
			grab_user();
		}
	});
	
	$("#yo_user").keypress(function(e) {
		if(e.which == 13) {
			grab_youser();
		}
	});

	$("#addFriend").click(function() {
		chrome.runtime.sendMessage({method: "addFriend", data: $("#tags").val()}, function(response) {
			console.log("Response received.");
		});
	});

	$("#removeFriend").click(function() {
		chrome.runtime.sendMessage({method: "removeFriend", data: $("#tags").val()}, function(response) {
			console.log("Response received.");
		});
	});

	$("#yo-button").click(function() {
		var name = $("#yo_user").val();
		send_yo(name);
	});
});



setInterval(function(){
	
	chrome.runtime.sendMessage({method: "listRequest"}, function(response) {
		$("#tags").autocomplete({
			source: unhash_users(response.users)
		});
	});
	
}, 1000);

function grab_youser(){
	var name = $("#yo_user").val();
	
	console.log("Sending yo user", name);
	chrome.runtime.sendMessage({method: "setYoUser", youser: name}, function(response) {
		console.log("Got response!");
	});
}

function grab_user(){
	var name = $("#tags").val();
	
	console.log("running grab user, name is", name);
	
	if (name == "Randomaldo Falso"){
		var friend = generate_dataset();
		drawGraph(friend);
		return;
	}
	else{
		var hash = Math.abs(name.hashCode()).toString(16);
		chrome.runtime.sendMessage({method: "friendRequest", hashCode: hash}, function(response) {
			console.log("Graph data is", response.friend);
			
			var friend = response.friend;
			drawGraph(friend);
			return;
		});
	}
}

function drawGraph(friend){
	 options = {
        chart: {
            type: 'heatmap',
            marginTop: 40,
            marginBottom: 40,
            backgroundColor: '#ADD8E6'
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

function unhash_users(users){
  var names = [];
  for (u in users){
      names.push(users[u].name);
  }
  return names;
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
