$(document).ready(function() {
	console.log("YOOOOO");
	var globalData;
	var myChart;
	$.get( "http://localhost:8081/per_game", function( data ) {
  		//console.log(JSON.stringify(data));
  		//data = JSON.stringify(data);
  		globalData = data;
  		var years = getYears(data);
  		var newData = getDataElement(data, "pts_per_g");
  		pointsPerGameChart(newData, years, "Points");
	});

	$('#dropdown1 li').click(function(){
	    console.log($(this).text()); // Get the ref attribute from the "a" element
	    $('#dropdown').text($(this).text());
	    var element = convertRawDropdownValue($(this).text());
	    var years = getYears(globalData);
  		var newData = getDataElement(globalData, element);
  		pointsPerGameChart(newData, years, $(this).text());
	});

	function convertRawDropdownValue(rawValue) {
		if (rawValue.includes("Points")) {
			return 'pts_per_g';
		}
		else if (rawValue.includes("Assists")) {
			return 'ast_per_g';
		}
		else if (rawValue.includes("Rebounds")) {
			return 'trb_per_g';
		}
	}

	function getYears(data) {
		var years = [];
		var p = data["seasons"];
		for (var key in p) {
		  if (p.hasOwnProperty(key)) {
		    console.log(key + " -> " + p[key]);
		    years.push(key);
		  }
		}

		return years;
	}

	function getDataElement(data, element) {
		var newData = [];
		var p = data["seasons"];
		for (var key in p) {
		  if (p.hasOwnProperty(key)) {
		    //console.log(key + " -> " + p[key]);
		    newData.push(p[key][element]);
		  }
		}

		return newData;
	}

	function pointsPerGameChart(data, years, stat) {
		if (typeof myChart != 'undefined') {
			myChart.destroy();
		}
		var ctx = document.getElementById("myChart").getContext('2d');
		myChart = new Chart(ctx, {
		    type: 'bar',
		    data: {
		        labels: years,
		        datasets: [{
		            label: stat + ' Per Game',
		            data: data,
		            backgroundColor : 'rgba(255, 99, 132, 0.2)',
		            borderColor : 'rgba(255,99,132,1)',
		            // backgroundColor: [
		            //     'rgba(255, 99, 132, 0.2)',
		            //     'rgba(54, 162, 235, 0.2)',
		            //     'rgba(255, 206, 86, 0.2)',
		            //     'rgba(75, 192, 192, 0.2)',
		            //     'rgba(153, 102, 255, 0.2)',
		            //     'rgba(255, 159, 64, 0.2)',
		            //     'rgba(255, 99, 132, 0.2)',
		            //     'rgba(54, 162, 235, 0.2)',
		            //     'rgba(255, 206, 86, 0.2)',
		            //     'rgba(75, 192, 192, 0.2)',
		            //     'rgba(153, 102, 255, 0.2)',
		            //     'rgba(255, 159, 64, 0.2)',
		            //     'rgba(255, 99, 132, 0.2)',
		            //     'rgba(54, 162, 235, 0.2)'
		            // ],
		            // borderColor: [
		            //     'rgba(255,99,132,1)',
		            //     'rgba(54, 162, 235, 1)',
		            //     'rgba(255, 206, 86, 1)',
		            //     'rgba(75, 192, 192, 1)',
		            //     'rgba(153, 102, 255, 1)',
		            //     'rgba(255, 159, 64, 1)',
		            //     'rgba(255,99,132,1)',
		            //     'rgba(54, 162, 235, 1)',
		            //     'rgba(255, 206, 86, 1)',
		            //     'rgba(75, 192, 192, 1)',
		            //     'rgba(153, 102, 255, 1)',
		            //     'rgba(255, 159, 64, 1)',
		            //     'rgba(255,99,132,1)',
		            //     'rgba(54, 162, 235, 1)'
		            // ],
		            borderWidth: 1
		        }]
		    },
		    options: {
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }]
		        },
		        responsive: false
		    }
		});
	}
});
