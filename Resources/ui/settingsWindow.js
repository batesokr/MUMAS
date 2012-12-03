/*
 * 
 * This window is opened upon selection of the map settings button.
 * It utilizes the routeSettingsView.js and routeTickerSettingsView.js
 * files.
 * 
 */

var settingsWindow = function() {
	// Modules required
	var RouteSettingsView = require('ui/routeSettingsView');
	var RouteTickerSettingsView = require('ui/routeTickerSettingsView');

	var self, container;
	if(Ti.Platform.getOsname() === "iphone"){
		self = Ti.UI.createWindow({
			backgrondColor: "white",
			layout: "vertical",
			title: "Settings"
		});
		
		var container = Ti.UI.createView({
		height: Ti.UI.FILL,
		backgroundColor : 'white',
		layout : 'vertical'
	});
	}else{
		self = Titanium.UI.createWindow({
	   		backgroundColor: 'white',
	    	opacity: -1,
	    	layout: 'vertical',
	    	title: 'Settings',
	    	modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
	        modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_PAGESHEET,
	    	modal: true,
	    	fullscreen: false
		});
		
		var container = Ti.UI.createView({
			height: Ti.UI.FILL,
			width: Ti.UI.FILL,
			backgroundColor : 'white',
			layout : 'vertical',
			borderColor : 'black',
    	    borderRadius : "40dp",
		    borderWidth : "2dp",
    	    opacity: .9,
		});
	}
		
	// Header for favorite routes
	var favLabel = Ti.UI.createLabel({
		text: 'Favorite Routes',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		width: Ti.UI.FILL,
		color: "white",
		backgroundColor: "red",
		font: {
			fontSize: "36dp",
			fontWeight: 'bold'
		}
	});	
	container.add(favLabel);
		
	// View containg the switches for favorite routes
	var rsv = new RouteSettingsView('100%');
	container.add(rsv);
	
	// Label for choosing which routes to countdown on
	var tickLabel = Ti.UI.createLabel({
		width: Ti.UI.FILL,
		text: 'Ticker Routes',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		color: "white",
		backgroundColor: "red",
		font: {
			fontSize: "36dp",
			fontWeight: 'bold'
		}
	});
	container.add(tickLabel);
		
	// View containing switches on which routes to countdown on
	var rtsv = new RouteTickerSettingsView('100%');
	container.add(rtsv);
		
	self.add(container);
	
	return self;
};

module.exports = settingsWindow;