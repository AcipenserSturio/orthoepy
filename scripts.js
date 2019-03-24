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
		document.getElementById("question").children[0].innerHTML = "Как правильно - " + choices[currentChoice].correct + " или " + choices[currentChoice].incorrect + "?";
		document.getElementById("button0").children[0].innerHTML = choices[currentChoice].correct;
		document.getElementById("button1").children[0].innerHTML = choices[currentChoice].incorrect;
	} else {
		document.getElementById("question").children[0].innerHTML = "Как правильно - " + choices[currentChoice].incorrect + " или " + choices[currentChoice].correct + "?";
		document.getElementById("button0").children[0].innerHTML = choices[currentChoice].incorrect;
		document.getElementById("button1").children[0].innerHTML = choices[currentChoice].correct;
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
	var rightWidthRounded = Math.round(rightWidth);
	var leftWidthRounded = 100 - rightWidthRounded;
	document.getElementById("choice" + selectedChoice + "name").children[0].innerHTML = choices[selectedChoice].ambiguous;
	document.getElementById("choice" + selectedChoice + "right").children[0].innerHTML = choices[selectedChoice].rightanswers + " (" + rightWidthRounded + "%)";
	document.getElementById("choice" + selectedChoice + "wrong").children[0].innerHTML = choices[selectedChoice].wronganswers + " (" + leftWidthRounded + "%)";
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
		var spanName = document.createElement('span');
		var spanRight = document.createElement('span');
		var spanWrong = document.createElement('span');
		spanName.innerHTML = choices[i].ambiguous;
		spanRight.innerHTML = choices[i].rightanswers;
		spanWrong.innerHTML = choices[i].wronganswers;
		document.getElementById("choice" + i + "stats").appendChild(choiceName);
		document.getElementById("choice" + i + "stats").appendChild(choiceRight);
		document.getElementById("choice" + i + "stats").appendChild(choiceWrong);
		document.getElementById("choice" + i + "name").appendChild(spanName);
		document.getElementById("choice" + i + "right").appendChild(spanRight);
		document.getElementById("choice" + i + "wrong").appendChild(spanWrong);
	}
}