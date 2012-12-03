/*
 * The "main method" of the app 
 */

// Global Variables
Ti.App.mapview;

// Retreive and store the OS of the device
var ANDROID = "android";
var IPHONE = "iphone";
var OS = Ti.Platform.getOsname();

// Various modules needed
var SwitchView = require("ui/routeSwitchView");
var Switch = require("ui/routeSwitch");
var SettingsWindow = require('ui/settingsWindow');
var Database = require("database/database");

// Install the databases needed. 
Database.install("MUMAS");

// Whether favorites are showing or not. 
var favorites = false;

// MAIN WINDOW **********************************
var root;
var win = Ti.UI.createWindow({
  backgroundColor: 'white',
  title: "MUMAS"
});

// Create a navigation group if the device is an iPhone
if(OS === IPHONE){
	root = Ti.UI.createWindow();
	var nav = Ti.UI.iPhone.createNavigationGroup({
		window: win
	});
	root.add(nav);
}

// CONTAINER*******************************************
// Container for everything
var container = Ti.UI.createView({
	backgroundColor : 'white',
	layout : 'vertical',
});

// View that contains the actual menu options
var routeView = Ti.UI.createView({
	backgroundColor : 'white',
	borderColor : 'red',
	borderWidth: "3dp",
	layout : 'horizontal',
	height : "130dp"
});

// View that contains the toggle switches for various routes
var switchView = new SwitchView('65%');
routeView.add(switchView);
SwitchView.update();

// View that is for setting options
var settingsView = Ti.UI.createView({
	backgroundColor : 'white',
	borderColor : 'red',
	borderWidth: "3dp",
	layout : 'vertical',
	height : Ti.UI.FILL,
	width : '35%'
});
routeView.add(settingsView);


// ROUTE SETTINGS BUTTONS *********************************************
// Map Settings
var mapSettingsButton = Ti.UI.createButton ({
	title: 'Map Settings',
   	top: "10dp",
  	width: '100dp',
  	height: "40dp"
})
mapSettingsButton.addEventListener('click',function(e){
	this.setEnabled(false);
  	if(OS === IPHONE){
  		nav.open(settingsWin, {
  			animated: true
  		});
  	}else{
  		settingsWin.open();
  	}		 
  	this.setEnabled(true);
});
settingsView.add(mapSettingsButton);

// Favorites Switch
var favoritesSwitch = Ti.UI.createButton({
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	top: "10%",
	title: "Favorites", 
	height: "25%",
	width: "80%"
});
favoritesSwitch.addEventListener('click',function(e){
	this.setEnabled(false);
 	if(!favorites) {
  		SwitchView.enableFavorites();
  	} else {
  		SwitchView.disableFavorites();
  	}
  	favorites = !favorites;
  	this.setEnabled(true);
});
settingsView.add(favoritesSwitch);

// The settings window
var settingsWin = new SettingsWindow();
settingsWin.addEventListener('close', function(e) {
	if(favorites) {
		SwitchView.enableFavorites();
	}
})


// MAPVIEW *********************************
Ti.App.mapview = Ti.Map.createView({
	mapType : Ti.Map.STANDARD_TYPE,
	region : {
		latitude : 39.508953,
		longitude : -84.734752,
		latitudeDelta : 0.005,
		longitudeDelta : 0.005
	},
	animate : false,
	userLocation : true
});


// UI BUILDERS **************************************
container.add(routeView);
container.add(Ti.App.mapview);

win.add(container);

if(OS === IPHONE){
	root.open();
}else{
	win.open();
}