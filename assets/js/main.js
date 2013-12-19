var colorLoversUrl = "http://www.colourlovers.com/api/palettes/top";
var palettes = JSON.parse(window.localStorage.getItem('palettes'));
var offset = 0;

function switchPalette(){
	var newPalette = palettes.pop();
	window.localStorage.setItem('palettes',JSON.stringify(palettes));

	var s1 = Snap("#dc-logo");
	s1.select("#d-top").attr({fill: '#' + newPalette.colors[0]});
	s1.select("#c-bottom").attr({fill: '#' + newPalette.colors[0]});
	s1.select("#d-left").attr({fill: '#' + newPalette.colors[1]});
	s1.select("#d-right").attr({fill: '#' + newPalette.colors[2]});
	s1.select("#d-bottom").attr({fill: '#'+ newPalette.colors[3]});
	s1.select("#c-top").attr({fill: '#' + newPalette.colors[3]});
	s1.select("#c-left").attr({fill: '#' + newPalette.colors[4]});

	var s2 = Snap("#stripe");
	s2.select("#stripe-0").attr({fill: '#' + newPalette.colors[0]});
	s2.select("#stripe-1").attr({fill: '#' + newPalette.colors[1]});
	s2.select("#stripe-2").attr({fill: '#' + newPalette.colors[2]});
	s2.select("#stripe-3").attr({fill: '#' + newPalette.colors[3]});
	s2.select("#stripe-4").attr({fill: '#' + newPalette.colors[4]});
}

$(function(){
	if(!palettes){
		$.getJSON(colorLoversUrl + "?jsonCallback=?", { numResults: 100, resultOffset: offset }, function(data) {
			window.localStorage.setItem('palettes', JSON.stringify(data));
			// don't change color on first arrival
		});
	}else{
		switchPalette();
	}
})