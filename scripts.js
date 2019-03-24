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
		var rightWidth = Math.round(100 * choices[selectedChoice].rightanswers / (choices[selectedChoice].rightanswers + choices[selectedChoice].wronganswers))
		var leftWidth = 100 - rightWidth;
	}
	
	document.getElementById("choice" + selectedChoice + "stats").innerHTML = 
	"<div class=\"choicename\" id=\"choice" + selectedChoice + "name\">"
	+ choices[selectedChoice].ambiguous 
	+ "</div>" 
	+ "<div style=\"width: "+ rightWidth + "%\" class=\"choiceright\" id=\"choice" + selectedChoice + "right\">" 
	+ choices[selectedChoice].rightanswers 
	+ "</div>" 
	+ "<div style=\"width: "+ leftWidth + "%\" class=\"choicewrong\" id=\"choice" + selectedChoice + "wrong\">" 
	+ choices[selectedChoice].wronganswers 
	+ "</div></div>";
}
function generateChoices() {
	choices[0] = new Choice("щаве́ль", "ща́вель", "щавель");
	choices[1] = new Choice("звони́т", "зво́нит", "звонит");
	updateStats(0);
	updateStats(1);
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