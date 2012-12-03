/**
 * View displaying the route radio buttons on the map settings window
 * These buttons are for the Favorite Routes section
 */

var METRO_DB = "metro";
var FAV_DB = "favs";

// The switches
var redSwich, blueSwitch, greenSwitch, orangeSwitch, yellowSwitch, purpleSwitch;

var routeSettingsView = function(width) {	
	var self = Ti.UI.createView({
		top: "20dp",
		layout : 'horizontal',
		height : "180dp",
		backgroundColor: "white",
		opacity: 1,
		width : width,
	});

	// ROUTE SWITCHES **********************************
	var RouteSwitch = require('ui/routeSwitch');
	
	// Red Switch
	redSwitch = new RouteSwitch('red'); 
	redSwitch.addEventListener('click', switch_onChange);
	self.add(redSwitch);
	
	// Blue Switch Switch
	blueSwitch = new RouteSwitch('blue'); 
	blueSwitch.addEventListener('click', switch_onChange);
	self.add(blueSwitch);
	
	// Green Switch
	greenSwitch = new RouteSwitch('green'); 
	greenSwitch.addEventListener('click', switch_onChange);
	self.add(greenSwitch);
		
	// Orange Switch
	orangeSwitch = new RouteSwitch('orange');
	orangeSwitch.addEventListener('click', switch_onChange);
	self.add(orangeSwitch);
		
	// Yellow Switch
	yellowSwitch = new RouteSwitch('yellow'); 
	yellowSwitch.addEventListener('click', switch_onChange);
	self.add(yellowSwitch);
	
	// Purple Switch
	purpleSwitch = new RouteSwitch('purple'); 
	purpleSwitch.addEventListener('click', switch_onChange);
	self.add(purpleSwitch);
	
	var favs = Ti.Database.open(FAV_DB);
	var rows = favs.execute("SELECT route, fav FROM FAVORITE;");
	while(rows.isValidRow()) {
		switch(rows.fieldByName("route")){
			case 'red': 	redSwitch.setBackgroundColor((rows.fieldByName("fav") === "true") 		? "red" 	: "gray"); 	break;
			case 'blue': 	blueSwitch.setBackgroundColor((rows.fieldByName("fav") === "true") 		? "blue" 	: "gray"); 	break;
  			case 'green': 	greenSwitch.setBackgroundColor((rows.fieldByName("fav") === "true") 	? "green" 	: "gray"); 	break;
  			case 'orange': 	orangeSwitch.setBackgroundColor((rows.fieldByName("fav") === "true") 	? "orange" 	: "gray"); 	break;
  			case 'yellow': 	yellowSwitch.setBackgroundColor((rows.fieldByName("fav") === "true") 	? "yellow" 	: "gray");	break;
  			case 'purple': 	purpleSwitch.setBackgroundColor((rows.fieldByName("fav") === "true") 	? "purple" 	: "gray"); 	break;
		}
		rows.next();
	}
	favs.close();
	
	return self;
}

function switch_onChange() {
	this.setEnabled(false);
	var favs = Ti.Database.open(FAV_DB);
	var color = this.getTitle();
	var status = this.getBackgroundColor();
	if(status === "gray") {
		this.setBackgroundColor(color);
		favs.execute("UPDATE FAVORITE SET fav = 'true' 	WHERE route = '"+color+"';");
	} else {
		this.setBackgroundColor("gray");
		favs.execute("UPDATE FAVORITE SET fav = 'false' WHERE route = '"+color+"';");
	}
	favs.close();
	this.setEnabled(true);
}

module.exports = routeSettingsView;