chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "setLocalStorage"){
		chrome.storage.local.users = request.data;
		sendResponse({});
		//~console.log("Data received:", chrome.storage.local.users);
		
		var friend = chrome.storage.local.users["5dd3d67b"]
		
		// Update data
		console.log(friend.name);
		console.log(friend.dataPoints);
		
		// Push to highcharts!
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
				name: '',
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
		console.log(friend);
		options.series[0].data = friend.dataPoints;
		
		$('#container').highcharts(options);
	}
});

$(function () {
 options = {
        chart: {
            type: 'heatmap',
            marginTop: 40,
            marginBottom: 40
        },


        title: {
            text: 'Sales per employee per weekday'
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
	
	$('#container').highcharts(options);
});
