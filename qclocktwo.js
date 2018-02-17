function highlightWord(coordinate_array) {
	
	for (var i = 0; i < coordinate_array.length; i++) {
		var coordinates = coordinate_array[i];
		var x = coordinates[0];
		var y = coordinates[1];
		
		// Find letter cell on Clock Matrix via jQuery:
		var letter = $("#clock tr:nth-child("+x+") td:nth-child("+y+")");
		letter.addClass('highlighted');
	}
}

function highlightWords(word_list) {
	for (var i = 0; i < word_list.length; i++) {
		highlightWord(wordMap[word_list[i]]);
	}
}

function reset() {
	
	for (var x = 1; x < 11; x++) {
		for (var y = 1; y < 12; y++) {
			
			// Find letter cell on Clock Matrix via jQuery:
			var letter = $("#clock tr:nth-child("+x+") td:nth-child("+y+")");
			letter.removeClass('highlighted');
		}
	}
	
	for (var i = 1; i <= 4; i++) {
		lamp = $("#minute_"+i);
		lamp.removeClass('highlighted');
	}
}

function displayTime(hours, minutes) {
	
	// Converts 24 hrs -> 12 hrs format	
	hours = hours % 12;
	
	// Fixes transition from 12 -> 1 (for indexing below)
	if (hours == 0)
		hours = 12;
	
	// Reset Display (all black)
	reset();
	
	var time_world_list = [];
	
	// Standard Text
	time_world_list.push("es");
	time_world_list.push("ist");
	
	var stunden = ["eins","zwei","drei_2","vier","fünf_2","sechs","sieben","acht","neun","zehn_2","elf","zwölf"];
	
	// Use hours as index (correct with -1); arrays indices start with 0
	time_world_list.push(stunden[hours-1]);
	
	// Determine number of minute lamps (0-4)
	minute_lamps = (minutes % 10) % 5;
	
	// Activate Minute Lamps
	if (minute_lamps > 0) {
		for (var i = 1; i <= minute_lamps; i++) {
			lamp = $("#minute_"+i);
			lamp.addClass('highlighted');
		}
	}
	
	var fitting_interval = 0;
	
	// Determine which 5 minute interval is the "nearest"
	if (minutes % 10 != 0) {
		
		if (minutes % 10 <= 4) {
			fitting_interval = (Math.round(minutes / 10)*10);
		}
		if (minutes % 10 >= 5) {
			fitting_interval = (Math.round(minutes / 10)*10)-5;
		}
	}
	else
		fitting_interval = minutes;
	
	// Translate 5 minute intervals into "spoken time"
	// Interestingly, most of the spoken time in German refers to the "next" hour rather than the current one.
	// e.g. 01:45 "dreiviertel zwei", 01:55 "fünf vor zwei"
	
	switch(fitting_interval) {
		case 0:
			time_world_list.push("uhr");
			break;
		case 5:
			time_world_list.push("fünf");
			time_world_list.push("nach");
			break;
		case 10:
			time_world_list.push("zehn");
			time_world_list.push("nach");
			break;
		case 15:
			// Remove hour
			time_world_list.pop();
			// Replace it by next hour; mod 12 fix transition from 12 -> 1
			time_world_list.push(stunden[hours%12]);
			time_world_list.push("viertel");
			break;
		case 20:
			time_world_list.push("zwanzig");
			time_world_list.push("nach");
			break;
		case 25:
			// Remove hour
			time_world_list.pop();
			// Replace it by next hour; mod 12 fix transition from 12 -> 1
			time_world_list.push(stunden[hours%12]);
			time_world_list.push("fünf");
			time_world_list.push("vor");
			time_world_list.push("halb");
			break;
		case 30:
			// Remove hour
			time_world_list.pop();
			// Replace it by next hour; mod 12 fix transition from 12 -> 1
			time_world_list.push(stunden[hours%12]);
			time_world_list.push("halb");
			break;
		case 35:
			// Remove hour
			time_world_list.pop();
			// Replace it by next hour; mod 12 fix transition from 12 -> 1
			time_world_list.push(stunden[hours%12]);
			time_world_list.push("fünf");
			time_world_list.push("nach");
			time_world_list.push("halb");
			break;
		case 40:
			// Remove hour
			time_world_list.pop();
			// Replace it by next hour; mod 12 fix transition from 12 -> 1
			time_world_list.push(stunden[hours%12]);
			time_world_list.push("zwanzig");
			time_world_list.push("vor");
			break;
		case 45:
			// Remove hour
			time_world_list.pop();
			// Replace it by next hour; mod 12 fix transition from 12 -> 1
			time_world_list.push(stunden[hours%12]);
			time_world_list.push("drei");
			time_world_list.push("viertel");
			break;
		case 50:
			// Remove hour
			time_world_list.pop();
			// Replace it by next hour; mod 12 fix transition from 12 -> 1
			time_world_list.push(stunden[hours%12]);
			time_world_list.push("zehn");
			time_world_list.push("vor");
			break;
		case 55:
			// Remove hour
			time_world_list.pop();
			// Replace it by next hour; mod 12 fix transition from 12 -> 1
			time_world_list.push(stunden[hours%12]);
			time_world_list.push("fünf");
			time_world_list.push("vor");
			break;
	}
	
	// Activate Words
	highlightWords(time_world_list);
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();

	displayTime(h,m);

    var t = setTimeout(startTime, 1000);
}

// Map Words to Letter Coordinates on Clock Matrix
var wordMap = {};

wordMap["es"] = [[1,1],[1,2]];
wordMap["ist"] = [[1,4],[1,5],[1,6]];
wordMap["fünf"] = [[1,8],[1,9],[1,10],[1,11]];
wordMap["zehn"] = [[2,1],[2,2],[2,3],[2,4]];
wordMap["zwanzig"] = [[2,5],[2,6],[2,7],[2,8],[2,9],[2,10],[2,11]];
wordMap["drei"] = [[3,1],[3,2],[3,3],[3,4]];
wordMap["viertel"] = [[3,5],[3,6],[3,7],[3,8],[3,9],[3,10],[3,11]];
wordMap["vor"] = [[4,1],[4,2],[4,3]];
wordMap["nach"] = [[4,8],[4,9],[4,10],[4,11]];
wordMap["halb"] = [[5,1],[5,2],[5,3],[5,4]];
wordMap["elf"] = [[5,6],[5,7],[5,8]];
wordMap["fünf_2"] = [[5,8],[5,9],[5,10],[5,11]];
wordMap["ein"] = [[6,1],[6,2],[6,3]];
wordMap["eins"] = [[6,1],[6,2],[6,3],[6,4]];
wordMap["zwei"] = [[6,8],[6,9],[6,10],[6,11]];
wordMap["drei_2"] = [[7,1],[7,2],[7,3],[7,4]];
wordMap["vier"] = [[7,8],[7,9],[7,10],[7,11]];
wordMap["sechs"] = [[8,1],[8,2],[8,3],[8,4],[8,5]];
wordMap["acht"] = [[8,8],[8,9],[8,10],[8,11]];
wordMap["sieben"] = [[9,1],[9,2],[9,3],[9,4],[9,5],[9,6]];
wordMap["zwölf"] = [[9,7],[9,8],[9,9],[9,10],[9,11]];
wordMap["zehn_2"] = [[10,1],[10,2],[10,3],[10,4]];
wordMap["neun"] = [[10,4],[10,5],[10,6],[10,7]];
wordMap["uhr"] = [[10,9],[10,10],[10,11]];