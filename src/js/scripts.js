import dictionaryArray from './dictionarylists';

// Global variables

// Stores all choices as an easily modifiable input array
var dictionary = [];
// Stores all choices objects
var choices = [];
// Stores which button references the correct answer
var correctButton;
// Stores which choice object is currently active
var currentChoice = 0;
// Stores how many turns there had been until now.
var currentTurn = 0;

var dictionary = [];
// Arrays of probabilities, for choice picking
// Currently available
var deck = [];
// Stored for next time
var stockpile = [];

// Choice object class
// Stores strings with correct/incorrect/ambiguous pronunciation
// Also stores the player's stats on this choice
class Choice {
	constructor(correct, incorrect, ambiguous) {
		this.correct = correct;
		this.incorrect = incorrect;
		this.ambiguous = ambiguous;
		this.rightanswers = 0;
		this.wronganswers = 0;
	}
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

// This function is called on page load
function main() {

	dictionary = dictionaryArray[getQueryVariable("q")];

	// Generate choice objects
	for (var i = 0; i < dictionary.length; i++) {
		choices[i] = new Choice(dictionary[i][0], dictionary[i][1], dictionary[i][2]);
	}

	// Generate stats displays for each choice object
	for (var i = 0; i < choices.length; i++) {
		var choiceStats = document.createElement('div');
		choiceStats.className = "choicestats";
		choiceStats.id = "choice" + i + "stats";
		document.getElementById("stats").appendChild(choiceStats);

		var choiceName = document.createElement('div');
		var choiceWrong = document.createElement('div');
		var choiceRight = document.createElement('div');
		choiceName.className = "choicename"
		choiceWrong.className = "choicewrong"
		choiceRight.className = "choiceright"
		choiceName.id = "choice" + i + "name";
		choiceWrong.id = "choice" + i + "wrong";
		choiceRight.id = "choice" + i + "right";
		var spanName = document.createElement('span');
		var spanWrong = document.createElement('span');
		var spanRight = document.createElement('span');
		spanName.innerHTML = choices[i].ambiguous;
		spanWrong.innerHTML = choices[i].wronganswers;
		spanRight.innerHTML = choices[i].rightanswers;
		document.getElementById("choice" + i + "stats").appendChild(choiceName);
		document.getElementById("choice" + i + "stats").appendChild(choiceWrong);
		document.getElementById("choice" + i + "stats").appendChild(choiceRight);
		document.getElementById("choice" + i + "name").appendChild(spanName);
		document.getElementById("choice" + i + "wrong").appendChild(spanWrong);
		document.getElementById("choice" + i + "right").appendChild(spanRight);

		document.getElementById("choice" + i + "name").onmouseover = function() {
			this.children[0].innerHTML = choices[Number(this.id.substring(6, this.id.length-4))].correct;
		};
		document.getElementById("choice" + i + "name").onmouseout = function() {
			this.children[0].innerHTML = choices[Number(this.id.substring(6, this.id.length-4))].ambiguous;
		};
	}

	// Update all stats
	for (var i = 0; i < choices.length; i++) {
		updateStats(i);
	}

	// Fill the deck with equal probabilities for each object
	for (var i = 0; i < choices.length; i++) {
		deck[i] = i;
	}

	// Start the game
	pickNewChoice();
	displayChoice();
}

// Displays the current choice as an interactive menu
function displayChoice() {
	correctButton = Math.round(Math.random());
	if (correctButton == 0) {
		document.getElementById("question").children[0].innerHTML = "Как правильно?";
		document.getElementById("button0").children[0].innerHTML = choices[currentChoice].correct;
		document.getElementById("button1").children[0].innerHTML = choices[currentChoice].incorrect;
	} else {
		document.getElementById("question").children[0].innerHTML = "Как правильно?";
		document.getElementById("button0").children[0].innerHTML = choices[currentChoice].incorrect;
		document.getElementById("button1").children[0].innerHTML = choices[currentChoice].correct;
	}
}

// Is called when the player clicks one of the buttons
// Checks whether the answer is correct
// Progresses the game to the next question
function check(clickedButton) {
	if (clickedButton == correctButton) {
		document.getElementById("previousanswer").children[0].innerHTML = "Правильно, " + choices[currentChoice].correct + "!";
		choices[currentChoice].rightanswers++;

		// Remove all copies from deck. Don't question it again in this round
		var temp = 0;
		while (temp < deck.length) {
			if (deck[temp] == currentChoice) {
				deck.splice(temp, 1);
			} else {
				temp++;
			}
		}
		temp = 0;
		while (temp < stockpile.length) {
			if (stockpile[temp] == currentChoice) {
				stockpile.splice(temp, 1);
			} else {
				temp++;
			}
		}

		// Only push one copy into stockpile
		stockpile.push(currentChoice);

	} else {
		document.getElementById("previousanswer").children[0].innerHTML = "Неверно! Правильно - " + choices[currentChoice].correct + ".";
		choices[currentChoice].wronganswers++;

		// Push multiple copies into stockpile
		stockpile.push(currentChoice);
		for (var i = 0; i < choices.length / 5; i++) {
			stockpile.push(currentChoice);
		}
	}
	updateStats(currentChoice);
	currentTurn++;

	// Next turn
	pickNewChoice();
	scrollToStat(currentChoice);
	displayChoice();
}

// Selects the next choice based on an algorithm
function pickNewChoice() {

	// Check whether one round has passed
	// currentTurn % choices.length == 0
	// Then reshuffle stockpile back into deck
	if (currentTurn % choices.length == 0) {
		deck = deck.concat(stockpile);
		stockpile = [];

		// Also check for winning conditions
		if (currentTurn != 0 && deck.length == choices.length) {
			win();
		}
	}

	// Pick random value from deck
	var newChoiceIndex = Math.floor(Math.random()*deck.length)
	currentChoice = deck[newChoiceIndex];

	// Remove that value from the deck, just once.
	deck.splice(newChoiceIndex, 1);

}

// Changes the values shown in the stats div for one specific choice
function updateStats(selectedChoice) {
	if (choices[selectedChoice].rightanswers + choices[selectedChoice].wronganswers == 0) {
		var rightWidth = 50;
		var leftWidth = 50;
	} else {
		var rightWidth = 100 * choices[selectedChoice].rightanswers / (choices[selectedChoice].rightanswers + choices[selectedChoice].wronganswers);
		var leftWidth = 100 - rightWidth;
	}
	var rightWidthRounded = Math.round(rightWidth);
	var leftWidthRounded = 100 - rightWidthRounded;
	document.getElementById("choice" + selectedChoice + "name").children[0].innerHTML = choices[selectedChoice].ambiguous;
	document.getElementById("choice" + selectedChoice + "right").children[0].innerHTML = choices[selectedChoice].rightanswers + " (" + rightWidthRounded + "%)";
	document.getElementById("choice" + selectedChoice + "wrong").children[0].innerHTML = choices[selectedChoice].wronganswers + " (" + leftWidthRounded + "%)";
	document.getElementById("choice" + selectedChoice + "right").style.width = rightWidth + "%";
	document.getElementById("choice" + selectedChoice + "wrong").style.width = leftWidth + "%";
}

function scrollToStat(selectedChoice) {
	document.getElementById("choice" + selectedChoice + "stats").scrollIntoView({block: "center"});
}

function win() {
	document.getElementById("answer").innerHTML = "<div class=\"has-text-centered\"><p>Поздравляю, вы закрепили материал!</p><br><div class=\"button\" onclick=\"window.location = '';\">Начать заново</div>";
}

export default { main, check };
