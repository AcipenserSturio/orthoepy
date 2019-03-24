var correctButton;
var choices = [];
var currentChoice;

class Choice {
	constructor(correct, incorrect, ambiguous) {
		this.correct = correct;
		this.incorrect = incorrect;
		this.ambiguous = ambiguous;
		this.rightanswers = 0;
		this.wronganswers = 0;
	}
}
function main() {
	generateChoices();
	generateDisplays();
	updateAllStats();
	currentChoice = 0;
	displayChoice();
}
function displayChoice() {
	correctButton = Math.round(Math.random());
	if (correctButton == 0) {
		document.getElementById("question").innerHTML = "Как правильно - " + choices[currentChoice].correct + " или " + choices[currentChoice].incorrect + "?";
		document.getElementById("button0").innerHTML = choices[currentChoice].correct;
		document.getElementById("button1").innerHTML = choices[currentChoice].incorrect;
	} else {
		document.getElementById("question").innerHTML = "Как правильно - " + choices[currentChoice].incorrect + " или " + choices[currentChoice].correct + "?";
		document.getElementById("button0").innerHTML = choices[currentChoice].incorrect;
		document.getElementById("button1").innerHTML = choices[currentChoice].correct;
	}
}
function check(clickedButton) {
	if (clickedButton == correctButton) {
		choices[currentChoice].rightanswers++;
	} else {
		choices[currentChoice].wronganswers++;
	}
	updateStats(currentChoice);
	nextQuestion();
}
function updateStats(selectedChoice) {
	if (choices[selectedChoice].rightanswers + choices[selectedChoice].wronganswers == 0) {
		var rightWidth = 50;
		var leftWidth = 50;
	} else {
		var rightWidth = 100 * choices[selectedChoice].rightanswers / (choices[selectedChoice].rightanswers + choices[selectedChoice].wronganswers);
		var leftWidth = 100 - rightWidth;
	}
	document.getElementById("choice" + selectedChoice + "name").innerHTML = choices[selectedChoice].ambiguous;
	document.getElementById("choice" + selectedChoice + "right").innerHTML = choices[selectedChoice].rightanswers;
	document.getElementById("choice" + selectedChoice + "wrong").innerHTML = choices[selectedChoice].wronganswers;
	document.getElementById("choice" + selectedChoice + "right").style.width = rightWidth + "%";
	document.getElementById("choice" + selectedChoice + "wrong").style.width = leftWidth + "%";
}
function generateChoices() {
	choices[0] = new Choice("щаве́ль", "ща́вель", "щавель");
	choices[1] = new Choice("звони́т", "зво́нит", "звонит");
	choices[2] = new Choice("апостро́ф", "апо́строф", "апостроф");
}
function updateAllStats() {
	for (var i = 0; i < choices.length; i++) {
		updateStats(i);
	}
}
function nextQuestion() {
	currentChoice = pickNewChoice();
	displayChoice();
}
function pickNewChoice() {
	if (currentChoice < choices.length-1) {
		return currentChoice + 1;
	} else {
		return 0;
	}
}
function generateDisplays() {
	for (var i = 0; i < choices.length; i++) {
		var choiceStats = document.createElement('div');
		choiceStats.className = "choicestats"
		choiceStats.id = "choice" + i + "stats";
		document.getElementById("stats").appendChild(choiceStats);
		
		var choiceName = document.createElement('div');
		var choiceRight = document.createElement('div');
		var choiceWrong = document.createElement('div');
		choiceName.className = "choicename"
		choiceRight.className = "choiceright"
		choiceWrong.className = "choicewrong"
		choiceName.id = "choice" + i + "name";
		choiceRight.id = "choice" + i + "right";
		choiceWrong.id = "choice" + i + "wrong";
		document.getElementById("choice" + i + "stats").appendChild(choiceName);
		document.getElementById("choice" + i + "stats").appendChild(choiceRight);
		document.getElementById("choice" + i + "stats").appendChild(choiceWrong);
		document.getElementById("choice" + i + "name").innerHTML = choices[i].ambiguous;
		document.getElementById("choice" + i + "right").innerHTML = choices[i].rightanswers;
		document.getElementById("choice" + i + "wrong").innerHTML = choices[i].wronganswers;
	}
}