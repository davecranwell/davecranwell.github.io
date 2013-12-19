var palettes = JSON.parse(window.localStorage.getItem('palettes'));
var offset = 0;

function switchPalette(){
	var newPalette = palettes.pop();
	window.localStorage.setItem('palettes',JSON.stringify(palettes));

	var s = Snap("#dc-logo");
	s.select("#d-top").attr({fill: '#'+newPalette.colors[0]});
	s.select("#c-bottom").attr({fill: '#'+newPalette.colors[0]});
	s.select("#d-left").attr({fill: '#'+newPalette.colors[1]});
	s.select("#d-right").attr({fill: '#'+newPalette.colors[2]});
	s.select("#d-bottom").attr({fill: '#'+newPalette.colors[3]});
	s.select("#c-top").attr({fill: '#'+newPalette.colors[3]});
	s.select("#c-left").attr({fill: '#'+newPalette.colors[4]});

	var s = Snap("#stripe");
	s.select("#stripe-0").attr({fill: '#'+newPalette.colors[0]});
	s.select("#stripe-1").attr({fill: '#'+newPalette.colors[1]});
	s.select("#stripe-2").attr({fill: '#'+newPalette.colors[2]});
	s.select("#stripe-3").attr({fill: '#'+newPalette.colors[3]});
	s.select("#stripe-4").attr({fill: '#'+newPalette.colors[4]});
}

$(function(){
	if(!palettes){
		$.getJSON("http://www.colourlovers.com/api/palettes/top?jsonCallback=?", { numResults: 100, resultOffset: offset }, function(data) {
			window.localStorage.setItem('palettes',JSON.stringify(data));
			// don't change color upon first load
		});
	}else{
		switchPalette();
	}
})