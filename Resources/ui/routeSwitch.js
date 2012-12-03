var routeSwitch = function(color) {
	var self = Ti.UI.createButton({
 	 	//style: (Ti.Platform.getOsname() === "android") ? Ti.UI.Android.SWITCH_STYLE_TOGGLEBUTTON : null,
  		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
 		title: color,
 		color: "black",
 		backgroundColor: "gray",
 		backgroundImage: "none",
 		backgroundDisabledColor: "white",
 		backgroundDisabledImage: "none",
 		width: '27%',
 		height : "28%",
 		left: "2%",
 		top: "2%",
 		right: "2%",
 		bottom: "2%"
	});
	return self;
};

module.exports = routeSwitch;
