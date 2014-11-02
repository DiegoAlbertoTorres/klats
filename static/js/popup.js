chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "setLocalStorage"){
		chrome.storage.local.users = request.data;
		sendResponse({});
		console.log("Data received:", chrome.storage.local.users);
		
		//~var friend = chrome.storage.local.users["5dd3d67b"];
		
		// Update data
		//~console.log(friend.name);
		//~console.log(friend.dataPoints);
		//~
		//~console.log(friend);
		//~options.series[0].data = friend.dataPoints;
		
		//~$('#container').highcharts(options);
	}
});

//~$(function () {
 //~options = {
        //~chart: {
            //~type: 'heatmap',
            //~marginTop: 40,
            //~marginBottom: 40
        //~},
//~
//~
        //~title: {
            //~text: 'Sales per employee per weekday'
        //~},
//~
        //~xAxis: {
			//~title: {
                //~text: "Hour"
            //~},
            //~labels: {
                //~format: '{value}:00'
            //~},
            //~minPadding: 0,
            //~maxPadding: 0,
            //~startOnTick: false,
            //~endOnTick: false,
            //~tickPositions: [0, 6, 12, 18, 24],
            //~tickWidth: 1,
            //~min: 0,
            //~max: 23
        //~},
//~
        //~yAxis: {
            //~categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            //~title: null
        //~},
//~
        //~colorAxis: {
            //~min: 0,
            //~minColor: '#FFFFFF',
            //~maxColor: Highcharts.getOptions().colors[0]
        //~},
//~
        //~legend: {
            //~align: 'right',
            //~layout: 'vertical',
            //~margin: 0,
            //~verticalAlign: 'top',
            //~y: 25,
            //~symbolHeight: 320
        //~},
//~
        //~tooltip: {
            //~formatter: function () {
                //~return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
                    //~this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
            //~}
        //~},
//~
        //~series: [{
            //~name: 'Sales per employee',
            //~borderWidth: 1,
            //~// Data is an array of arrays. Each element has form: [Hour, day, value]
            //~data: [],
            //~dataLabels: {
                //~enabled: true,
                //~color: 'black',
                //~style: {
                    //~textShadow: 'none'
                //~}
            //~}
        //~}]
//~
    //~};
	//~
	//~$('#container').highcharts(options);
//~});

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
            categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
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
            name: 'Sales per employee',
            borderWidth: 1,
            // Data is an array of arrays. Each element has form: [Hour, day, value]
            data: [],
            dataLabels: {
                enabled: true,
                color: 'black',
                style: {
                    textShadow: 'none'
                }
            }
        }]

    };
	
	options.series[0].data = friend.dataPoints;
	$('#container').highcharts(options);
}


$(setTimeout(function() {
    var users = unhash_users();
    $("#tags").autocomplete({
      source: users
    });
    
    $("#tags").keypress(function(e) {
    if(e.which == 13) {
        grab_user();
    }
});

}, 10000));
  

function unhash_users(){
  var names = [];
  var users = chrome.storage.local.users;
  for (u in users){
      names.push(users[u].name);
  }
  return names;
}

function grab_user(){
	console.log("you are here!");
	var name = $("#tags").val();
	//~var name = document.getElementById("tags").select();
	var hash = Math.abs(name.hashCode()).toString(16);
	var friend = chrome.storage.local.users[hash];
	console.log(friend);
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







