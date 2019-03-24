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
	document.getElementById("question").innerHTML = "Как правильно - " + choices[currentChoice].correct + " или " + choices[currentChoice].incorrect + "?";
	document.getElementById("button1").innerHTML = choices[currentChoice].correct;
	document.getElementById("button2").innerHTML = choices[currentChoice].incorrect;
	correctButton = 0;
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
	document.getElementById("choice" + selectedChoice + "name").innerHTML = 
	choices[selectedChoice].ambiguous;
	document.getElementById("choice" + selectedChoice + "right").innerHTML = 
	"Правильных ответов: " + choices[selectedChoice].rightanswers;
	document.getElementById("choice" + selectedChoice + "wrong").innerHTML = 
	"Неправильных ответов: " + choices[selectedChoice].wronganswers;
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