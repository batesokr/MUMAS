/*
 * 
 * View displaying the route radio buttons on the map settings window
 * These buttons are for the Route Tickers section
 * 
 */

var METRO_DB = "metro";
var FAV_DB = "favs";

var routeTickerSettingsView = function(width) {
	
	//Titanium.Database.install('/MUMASDB.sqlite', 'database');
	var myLat = 0;
	var myLon = 0;

	Ti.Geolocation.purpose = "Following user";
	Ti.Geolocation.addEventListener('location', function(e) {
		myLat = e.coords.latitude;
		myLon = e.coords.longitude;
	});
	
	var self = Ti.UI.createView({
		top: "10dp",
		layout : 'horizontal',
		height : "180dp",
		backgroundColor: "white",
		opacity: 1,
		width : width,
	})
	
	// ROUTE SWITCHES **********************************
	var RouteSwitch = require('ui/routeSwitch')
	
	// Red Switch
	var redSwitch = new RouteSwitch('red'); 
	redSwitch.addEventListener('click', switch_onChange)
	self.add(redSwitch);
	
	// Blue Switch Switch
	var blueSwitch = new RouteSwitch('blue'); 
	blueSwitch.addEventListener('click', switch_onChange);
	self.add(blueSwitch);
	
	// Green Switch
	var greenSwitch = new RouteSwitch('green'); 
	greenSwitch.addEventListener('click', switch_onChange);
	self.add(greenSwitch);
		
	// Orange Switch
	var orangeSwitch = new RouteSwitch('orange');
	orangeSwitch.addEventListener('click', switch_onChange);
	self.add(orangeSwitch);
		
	// Yellow Switch
	var yellowSwitch = new RouteSwitch('yellow'); 
	yellowSwitch.addEventListener('click',switch_onChange);
   	self.add(yellowSwitch);
	
	// Purple Switch
	var purpleSwitch = new RouteSwitch('purple'); 
	purpleSwitch.addEventListener('click', switch_onChange)
	self.add(purpleSwitch);
	
	return self;
}

function switch_onChange(e) {
	this.setEnabled(false);
	var color = this.getBackgroundColor();
	if (color === "gray") {
		this.setBackgroundColor(this.getTitle());
		var closestStop;
		var minDistance = -1;
		var db = Ti.Database.open(METRO_DB);
		var rows = db.execute("SELECT S.stopName, S.latitude, S.longitude FROM STOP S, ROUTE R, ROUTE_PATH RP"
								+" WHERE R.rowid=RP.routeid AND RP.stopid=S.rowid AND R.color LIKE '%"+color+"%';");
		while (rows.isValidRow()) {
			var dist = distance(myLat, myLon, rows.fieldByName("latitude"), rows.fieldByName("longitude"));
			if (dist < minDistance || minDistance == -1) {
				minDistance = dist;
				closestStop = rows.fieldByName("stopName");
			}
			rows.next();
		}
		db.close();
		getTimes('Red', closestStop);
	} else {
		this.setBackbroundColor("gray");
	}
	this.setEnabled(true);
}

function distance( lat1, lon1, lat2, lon2 ) {
   	var lats = 0;
   	var lons = 0;
   	lats = lat2 - lat1;
   	lats = lats * lats;
   	lons = lon2 - lon1;
   	lons = lons * lons;
   	return Math.sqrt( lats + lons );
}

function getCurrentTime() {
	var asynch =	false;
	var time = -1;
	url = "http://capstone-bus-f10.csi.muohio.edu:8080/onebusaway-api-webapp/api/where/current-time.json?key=TEST&app_uid=admin&app_ver=9";
		
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			var pois = JSON.parse(client.responseText);
			var t = JSON.stringify(pois.data.time);
			alert(convertTime(t));
			return t;
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			alert('error');
		},
		timeout : 5000  // in milliseconds
	});
	// Prepare the connection.
	
	client.open("GET", url, asynch);
	// Send the request.
	client.send(); 
	 
	client.onerror = function() {
		alert("error connecting to \n" + url);
    	Ti.API.info("Get Time onerror");
	};
	
}

function getTimes( routeColor, stop ) {
	var asynch =	false;
	var time = getCurrentTime();
	var baseurl = 	"http://capstone-bus-f10.csi.muohio.edu:8080/onebusaway-api-webapp/api/where/schedule-for-stop/";
	var jsonFile = 	"1_" + stop + ".json" ;
	var params = 	"?key=TEST&app_uid=admin&app_ver=9";
	url = baseurl+jsonFile+params;
		
	//alert(time);
		
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			var pois = JSON.parse(client.responseText);
			var routes = pois.data.entry.stopRouteSchedules;
			for(var i = 0; i < routes.length; i++) {
				var routeName = "1_" + routeColor;
				if(routes[i].routeId == routeName) {
					var stops = routes[i].stopRouteDirectionSchedules;
					for(var j = 0; j < stops.length; j++) {
						for(var k = 0; k < stops[j].scheduleStopTimes.length; k++) {
							if (stops[j].scheduleStopTimes[k].departureTime > time) {
								if(k == 0) {
									alert(convertTime(stops[j].scheduleStopTimes[k-1].departureTime));
								} else {
									alert("NO BUS");
								}
							}
						}
					}
				}
			}
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			alert('error');
		},
		timeout : 5000  // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", url, asynch);
	// Send the request.
	client.send(); 
}

var convertTime = function(ms) {
	var milliSecs = ms;
	var msSecs = (1000);
	var msMins = (msSecs * 60);
	var msHours = (msMins * 60);
	var numHours = Math.floor(milliSecs/msHours);
	var numMins = Math.floor((milliSecs - (numHours * msHours)) / msMins);
	//var numSecs = Math.floor((milliSecs - (numHours * msHours) - (numMins * msMins))/ msSecs);
	return numMins;
}


module.exports = routeTickerSettingsView;