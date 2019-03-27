﻿// Global variables

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

// Arrays of probabilities, for choice picking
// Currently available
var deck = [];
// Stored for next time
var stockpile = [];

// Stores how many full rounds a person has gone through without failing a single answer
// winStreak == 2 triggers win conditions
var winStreak;


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

// This function is called on page load
function main() {
	
	// Gets input text
	fillDictionary();
	
	// Generate choice objects
	for (var i = 0; i < dictionary.length; i++) {
		choices[i] = new Choice(dictionary[i][0], dictionary[i][1], dictionary[i][2]);
	}
	
	// Generate stats displays for each choice object
	for (var i = 0; i < choices.length; i++) {
		var choiceStats = document.createElement('div');
		choiceStats.className = "choicestats"
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
			winStreak++;
		} else {
			winStreak = 0;
		}
		if (winStreak == 2) {
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
	document.getElementById("answer").innerHTML = "Поздравляю, вы закрепили материал!<br /><br /><br />";
}

// This is essentially storage for the questions
// As long as I don't have a way to upload text from file,
// This will have to do
function fillDictionary() {
	dictionary = [
		["апостро́ф", "апо́строф", "апостроф"],
		["аэропо́рты", "аэропорты́", "аэропорты"],
		["бало́ванный", "ба́лованный", "балованный"],
		["балу́ясь", "ба́луясь", "балуясь"],
		["ба́нты", "банты́", "банты"],
		["болтли́ва", "болтлива́", "болтлива"],
		["бо́роду", "бороду́", "бороду"],
		["брала́", "бра́ла", "брала"],
		["брала́сь", "бра́лась", "бралась"],
		["бухга́лтеров", "бухгалтёров", "бухгалтеров"],
		["верна́", "ве́рна", "верна"],
		["вероиспове́дание", "вероисповеда́ние", "вероисповедание"],
		["взяла́", "взя́ла", "взяла"],
		["взяла́сь", "взя́лась", "взялась"],
		["включён", "вклю́чен", "включен"],
		["включённый", "вклю́ченный", "включенный"],
		["влила́сь", "вли́лась", "влилась"],
		["во́время", "вовре́мя", "вовремя"],
		["водопрово́д", "водопро́вод", "водопровод"],
		["ворвала́сь", "ворва́лась", "ворвалась"],
		["восприняла́", "воспри́няла", "восприняла"],
		["воссоздала́", "воссо́здала", "воссоздала"],
		["вручи́т", "вру́чит", "вручит"],
		["вручи́ть", "вру́чить", "вручить"],
		["газопрово́д", "газопро́вод", "газопровод"],
		["гнала́", "гна́ла", "гнала"],
		["гнала́сь", "гна́лась", "гналась"],
		["гражда́нство", "гра́жданство", "гражданство"],
		["дефи́с", "де́фис", "дефис"],
		["дешеви́зна", "дешевизна́", "дешевизна"],
		["диспансе́р", "диспа́нсер", "диспансер"],
		["добела́", "добе́ла", "добела"],
		["добрала́", "добра́ла", "добрала"],
		["добрала́сь", "добра́лась", "добралась"],
		["довезённый", "до́везенный", "довезенный"],
		["до́верху", "дове́рху", "доверху"],
		["договорённость", "догово́ренность", "договоренность"],
		["дождала́сь", "дожда́лась", "дождалась"],
		["дозвони́тся", "дозво́нится", "дозвонится"],
		["дозвони́ться", "дозво́ниться", "дозвониться"],
		["дозвоня́тся", "дозво́нятся", "дозвонятся"],
		["дози́ровать", "дозирова́ть", "дозировать"],
		["докуме́нт", "доку́мент", "документ"],
		["доне́льзя", "донельзя́", "донельзя"],
		["до́низу", "дони́зу", "донизу"],
		["дорогови́зна", "дороговизна́", "дороговизна"],
		["досу́г", "до́суг", "досуг"],
		["до́суха", "досу́ха", "досуха"],
		["доя́р", "до́яр", "дояр"],
		["ерети́к", "ере́тик", "еретик"],
		["жалюзи́", "жа́люзи", "жалюзи"],
		["ждала́", "жда́ла", "ждала"],
		["жило́сь", "жи́лось", "жилось"],
		["зави́дно", "за́видно", "завидно"],
		["за́гнутый", "загну́тый", "загнутый"],
		["за́годя", "загодя́", "загодя"],
		["заку́порив", "закупо́рив", "закупорив"],
		["заку́порить", "закупо́рить", "закупорить"],
		["за́нял", "заня́л", "занял"],
		["заняла́", "за́няла", "заняла"],
		["за́няли", "заняли́", "заняли"],
		["за́няло", "заняло́", "заняло"],
		["занята́", "за́нята", "занята"],
		["заня́ть", "за́нять", "занять"],
		["заперла́", "за́перла", "заперла"],
		["заперла́сь", "за́перлась", "заперлась"],
		["заперта́", "за́перта", "заперта"],
		["за́светло", "засветло́", "засветло"],
		["заселена́", "засе́лена", "заселена"],
		["заселённый", "засе́ленный", "заселенный"],
		["за́темно", "затемно́", "затемно"],
		["защеми́т", "заще́мит", "защемит"],
		["звала́", "зва́ла", "звала"],
		["звони́м", "зво́ним", "звоним"],
		["звони́т", "зво́нит", "звонит"],
		["звони́ть", "зво́нить", "звонить"],
		["звони́шь", "зво́нишь", "звонишь"],
		["зна́чимость", "значи́мость", "значимость"],
		["зна́чимый", "значи́мый", "значимый"],
		["избало́ванный", "изба́лованный", "избалованный"],
		["и́ксы", "иксы́", "иксы"],
		["исче́рпать", "исчерпа́ть", "исчерпать"],
		["катало́г", "ката́лог", "каталог"],
		["кварта́л", "ква́ртал", "квартал"],
		["киломе́тр", "кило́метр", "километр"],
		["киоскёр", "кио́скер", "киоскер"],
		["кла́ла", "клала́", "клала"],
		["кле́ить", "клеи́ть", "клеить"],
		["контролёр", "контро́лер", "контролер"],
		["ко́нусов", "конусо́в", "конусов"],
		["ко́нусы", "конусы́", "конусы"],
		["кормя́щий", "ко́рмящий", "кормящий"],
		["коры́сть", "ко́рысть", "корысть"],
		["кра́лась", "крала́сь", "кралась"],
		["кра́ны", "краны́", "краны"],
		["краси́вее", "красиве́е", "красивее"],
		["краси́вейший", "красиве́йший", "красивейший"],
		["креме́нь", "кре́мень", "кремень"],
		["кремня́", "кре́мня", "кремня"],
		["кровоточа́щий", "кровото́чащий", "кровоточащий"],
		["ку́хонный", "кухо́нный", "кухонный"],
		["лгала́", "лга́ла", "лгала"],
		["ле́кторов", "лекторо́в", "лекторов"],
		["ле́кторы", "лектора́", "лекторы"],
		["лила́", "ли́ла", "лила"],
		["лила́сь", "ли́лась", "лилась"],
		["ловка́", "ло́вка", "ловка"],
		["лыжня́", "лы́жня", "лыжня"],
		["маля́р", "ма́ляр", "маляр"],
		["ме́стностей", "местносте́й", "местностей"],
		["мозаи́чный", "моза́ичный", "мозаичный"],
		["моля́щий", "мо́лящий", "молящий"],
		["мусоропрово́д", "мусоропро́вод", "мусоропровод"],
		["наве́рх", "на́верх", "наверх"],
		["наврала́", "навра́ла", "наврала"],
		["надели́т", "наде́лит", "наделит"],
		["надо́лго", "на́долго", "надолго"],
		["надорвала́сь", "надорва́лась", "надорвалась"],
		["нажи́вший", "на́живший", "наживший"],
		["нажита́", "на́жита", "нажита"],
		["на́житый", "нажи́тый", "нажитый"],
		["назвала́сь", "назва́лась", "назвалась"],
		["накрени́тся", "накре́нится", "накренится"],
		["накрени́ться", "накре́ниться", "накрениться"],
		["нали́вший", "на́ливший", "наливший"],
		["налила́", "нали́ла", "налила"],
		["налита́", "нали́та", "налита"],
		["наме́рение", "намере́ние", "намерение"],
		["наня́вшийся", "на́нявшийся", "нанявшийся"],
		["нарвала́", "нарва́ла", "нарвала"],
		["наро́ст", "на́рост", "нарост"],
		["насори́т", "насо́рит", "насорит"],
		["насори́ть", "насо́рить", "насорить"],
		["нача́в", "на́чав", "начав"],
		["нача́вший", "на́чавший", "начавший"],
		["нача́вшись", "на́чавшись", "начавшись"],
		["на́чал", "нача́л", "начал"],
		["начала́", "на́чала", "начала"],
		["на́чали", "нача́ли", "начали"],
		["начата́", "на́чата", "начата"],
		["на́чатый", "нача́тый", "начатый"],
		["нача́ть", "на́чать", "начать"],
		["не́друг", "недру́г", "недруг"],
		["неду́г", "не́дуг", "недуг"],
		["некроло́г", "некро́лог", "некролог"],
		["не́нависть", "ненави́сть", "ненависть"],
		["ненадо́лго", "нена́долго", "ненадолго"],
		["нефтепрово́д", "нефтепро́вод", "нефтепровод"],
		["низведён", "низве́ден", "низведен"],
		["низведённый", "низве́денный", "низведенный"],
		["новосте́й", "но́востей", "новостей"],
		["но́готь", "ного́ть", "ноготь"],
		["но́гтя", "ногтя́", "ногтя"],
		["нормирова́ть", "норми́ровать", "нормировать"],
		["обзвони́т", "обзво́нит", "обзвонит"],
		["облегчи́т", "обле́гчит", "облегчит"],
		["облегчи́ть", "обле́гчить", "облегчить"],
		["облила́сь", "обли́лась", "облилась"],
		["обняла́сь", "обня́лась", "обнялась"],
		["обогнала́", "обогна́ла", "обогнала"],
		["ободрала́", "ободра́ла", "ободрала"],
		["ободрён", "обо́дрен", "ободрен"],
		["ободрена́", "обо́дрена", "ободрена"],
		["ободрённый", "обо́дренный", "ободренный"],
		["ободри́ть", "обо́дрить", "ободрить"],
		["ободри́шься", "обо́дришься", "ободришься"],
		["обострённый", "обо́стренный", "обостренный"],
		["обостри́ть", "обо́стрить", "обострить"],
		["одолжи́т", "одо́лжит", "одолжит"],
		["одолжи́ть", "одо́лжить", "одолжить"],
		["озло́бить", "озлоби́ть", "озлобить"],
		["окле́ить", "оклеи́ть", "оклеить"],
		["окружи́т", "окру́жит", "окружит"],
		["опломбирова́ть", "опломби́ровать", "опломбировать"],
		["опо́шлить", "опошли́ть", "опошлить"],
		["определён", "опреде́лен", "определен"],
		["опто́вый", "о́птовый", "оптовый"],
		["осве́домиться", "осведоми́ться", "осведомиться"],
		["осве́домишься", "осведоми́шься", "осведомишься"],
		["отбыла́", "отбы́ла", "отбыла"],
		["отда́в", "о́тдав", "отдав"],
		["отдала́", "отда́ла", "отдала"],
		["о́тзыв (на публикацию)", "отзы́в (на публикацию)", "отзыв (на публикацию)"],
		["отзы́в (посла)", "о́тзыв (посла)", "отзыв (посла)"],
		["отключённый", "отклю́ченный", "отключенный"],
		["отку́порил", "откупо́рил", "откупорил"],
		["отку́порить", "откупо́рить", "откупорить"],
		["отозвала́", "отозва́ла", "отозвала"],
		["отозвала́сь", "отозва́лась", "отозвалась"],
		["о́трок", "отро́к", "отрок"],
		["о́трочество", "отро́чество", "отрочество"],
		["парте́р", "па́ртер", "партер"],
		["перезвони́т", "перезво́нит", "перезвонит"],
		["перелила́", "перели́ла", "перелила"],
		["плодоноси́ть", "плодоно́сить", "плодоносить"],
		["повторённый", "повто́ренный", "повторенный"],
		["повтори́т", "повто́рит", "повторит"],
		["поделённый", "поде́ленный", "поделенный"],
		["подня́в", "по́дняв", "подняв"],
		["позвала́", "позва́ла", "позвала"],
		["позвони́т", "позво́нит", "позвонит"],
		["позвони́шь", "позво́нишь", "позвонишь"],
		["позы́в", "по́зыв", "позыв"],
		["полила́", "поли́ла", "полила"],
		["положи́л", "поло́жил", "положил"],
		["положи́ть", "поло́жить", "положить"],
		["поня́в", "по́няв", "поняв"],
		["поня́вший", "по́нявший", "понявший"],
		["поняла́", "по́няла", "поняла"],
		["портфе́ль", "по́ртфель", "портфель"],
		["по́ручни", "пору́чни", "поручни"],
		["посла́ла", "послала́", "послала"],
		["по́честей", "почесте́й", "почестей"],
		["премирова́ть", "преми́ровать", "премировать"],
		["прибы́в", "при́быв", "прибыв"],
		["при́был", "прибы́л", "прибыл"],
		["прибыла́", "при́была", "прибыла"],
		["при́было", "прибыло́", "прибыло"],
		["прида́ное", "при́даное", "приданое"],
		["призы́в", "при́зыв", "призыв"],
		["прину́дить", "принуди́ть", "принудить"],
		["при́нял", "приня́л", "принял"],
		["приняла́", "при́няла", "приняла"],
		["при́няли", "приня́ли", "приняли"],
		["при́нятый", "приня́тый", "принятый"],
		["приручённый", "приру́ченный", "прирученный"],
		["прожи́вший", "про́живший", "проживший"],
		["прожо́рлива", "прожорли́ва", "прожорлива"],
		["прозорли́ва", "прозо́рлива", "прозорлива"],
		["рвала́", "рва́ла", "рвала"],
		["свёкла", "свекла́", "свекла"],
		["сверли́т", "све́рлит", "сверлит"],
		["сверли́шь", "све́рлишь", "сверлишь"],
		["сиро́ты (мн.ч.)", "сироты́ (мн. ч.)", "сироты (мн.ч.)"],
		["сли́вовый", "сливо́вый", "сливовый"],
		["смазли́ва", "сма́злива", "смазлива"],
		["сняла́", "сня́ла", "сняла"],
		["снята́", "сня́та", "снята"],
		["со́гнутый", "согну́тый", "согнутый"],
		["созда́в", "со́здав", "создав"],
		["создала́", "со́здала", "создала"],
		["созы́в", "со́зыв", "созыв"],
		["сорвала́", "сорва́ла", "сорвала"],
		["сори́т", "со́рит", "сорит"],
		["сортирова́ть", "сорти́ровать", "сортировать"],
		["сре́дства", "средства́", "средства"],
		["ста́туя", "стату́я", "статуя"],
		["столя́р", "сто́ляр", "столяр"],
		["суетли́ва", "суётлива", "суетлива"],
		["тамо́жня", "та́можня", "таможня"],
		["то́ртов", "торто́в", "тортов"],
		["то́рты", "торты́", "торты"],
		["убрала́", "убра́ла", "убрала"],
		["убыстри́ть", "убы́стрить", "убыстрить"],
		["углуби́ть", "углу́бить", "углубить"],
		["укрепи́т", "укре́пит", "укрепит"],
		["укрепи́ть", "укре́пить", "укрепить"],
		["формирова́ть", "форми́ровать", "формировать"],
		["цеме́нт", "це́мент", "цемент"],
		["це́нтнер", "центне́р", "центнер"],
		["цепо́чка", "це́почка", "цепочка"],
		["че́люстей", "челюсте́й", "челюстей"],
		["че́рпать", "черпа́ть", "черпать"],
		["ша́рфы", "шарфы́", "шарфы"],
		["школя́р", "шко́ляр", "школяр"],
		["шофёр", "шо́фер", "шофер"],
		["щаве́ль", "ща́вель", "щавель"],
		["щёлкать", "щелка́ть", "щелкать"],
		["щеми́т", "ще́мит", "щемит"],
		["экспе́рт", "э́ксперт", "эксперт"]
	];
}