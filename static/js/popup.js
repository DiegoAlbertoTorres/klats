chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "setLocalStorage"){
		chrome.storage.local.users = request.data;
		sendResponse({});
		
		var users = unhash_users();
		$("#tags").autocomplete({
			source: users
		});
		
	}
});


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
            maxColor: Highcharts.getOptions().colors[0]
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
            formatter: function () {
                return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
                    this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
            }
        },

        series: [{
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

function unhash_users(){
  var names = [];
  var users = chrome.storage.local.users;
  for (u in users){
      names.push(users[u].name);
  }
  return names;
}

function grab_user(){
	var name = $("#tags").val();
	var hash = Math.abs(name.hashCode()).toString(16);
	var friend = chrome.storage.local.users[hash];
	
	drawGraph(friend);
	return;
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

$(document).ready(function(){
	$("#tags").keypress(function(e) {
		if(e.which == 13) {
			grab_user();
		}
	});
});







