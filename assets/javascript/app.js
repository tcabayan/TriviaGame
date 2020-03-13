// Institute Variables

var time = 30;
var intervalId = "";
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var arrayFinder = 0;


var question01 = {
	question: "How many Earths could fit inside the sun?",
	answers: ["3", "1,300", "130,000", "1.3 million"],
	values: ["incorrect", "incorrect", "incorrect", "correct"],
	correct: "1.3 million",
};
var question02 = {
    question: "How many of the speeches in Shakespeare's plays are recited by women?",
    answers: ["seventeen percent", "thirty-three percent", "forty-seven percent", "fifty-nine percent"],
    values: ["correct", "incorrect", "incorrect", "incorrect"],
    correct: "seventeen percent",
};

var question03 = {
    question: "Which country consumes the most chocolate per capita?",
    answers: ["France", "England", "United States of America", "Switzerland"],
    values: ["incorrect", "incorrect", "incorrect", "correct"],
    correct: "Switzerland",
};

var question04 = {
    question: "In which country was the largest known T-rex skeleton found?",
    answers: ["France", "Egypt", "Canada", "Brazil"],
    values: ["incorrect", "incorrect", "correct", "incorrect"],
    correct: "Canada",
};

var question05 = {
    question: "What was the first toy to be advertised on television?",
    answers: ["Dinky Toys", "Barbie", "Mr.Potato Head", "Slinky"],
    values: ["incorrect", "incorrect", "correct", "incorrect"],
    correct: "Mr.Potato Head",
};

var question06 = {
    question: "What is the smallest bone in the human body?",
    answers: ["Stapes", "Malleus", "Incus", "Distal Phalanges"],
    values: ["correct", "incorrect", "incorrect", "incorrect"],
    correct: "Stapes",
};

var question07 = {
    question: "Which country has the oldest continuously used national flag?",
    answers: ["England", "Turkey", "Denmark", "Italy"],
    values: ["incorrect", "incorrect", "correct", "incorrect"],
    correct: "Denmark",
};

var question08 = {
    question: "How many languages are written from right to left?",
    answers: ["Three", "Twelve", "Six", "Twenty"],
    values: ["incorrect", "correct", "incorrect", "incorrect"],
    correct: "Twelve",
};


var questionsArray = [question01, question02, question03, question04, question05, question06, question07, question08];

// Functions

	function start () {
		$(".content").empty();
		var startButton = $("<button>");
		startButton.text("Start");
		startButton.addClass("start btn btn-default answerBtn");
		$(".content").append(startButton);
	};

	function run() {
      intervalId = setInterval(decrement, 1000);
    };

    function decrement() {
      time--;
      $(".timer").html("Time Remaining: " + time + " Seconds");
      if (time == 0) {
        if (arrayFinder < questionsArray.length-1) {
        	setTimeout(function () {questionWrite(questionsArray[arrayFinder])}, 2000);
        	solutionWrite(questionsArray[arrayFinder]);
	    	$(".question").html("Incorrect!");
        	stop();
        	unanswered++;
      	}
      	else if (arrayFinder < questionsArray.length) {
      		setTimeout(function () {endWrite(questionsArray[arrayFinder])}, 2000);
      		solutionWrite(questionsArray[arrayFinder]);
	    	$(".question").html("Incorrect!");
        	stop();
        	unanswered++;
      	}
      };
    };

    function stop() {
      clearInterval(intervalId);
    };

	function questionWrite (obj) {
		time = 30;
		$(".timer").empty();
		$(".timer").html("Time Remaining: " + time + " Seconds");
		$(".question").empty();
		$(".content").empty();
		run ();
		$(".question").html(obj.question);
		for (var i = 0; i < obj.answers.length; i++) {
			var answerButton = $("<button>");
			answerButton.addClass("answer btn btn-default answerBtn");
			answerButton.text(obj.answers[i]);
			answerButton.attr("value", obj.values[i]);
			$(".content").append(answerButton);
			$(".content").append("<br>");
		};
	};

	function solutionWrite (obj) {
		$(".question").empty();
		$(".content").empty();
		$(".content").html("The correct answer was " + obj.correct + "<br>");
		arrayFinder++;
	};

	function startWrite () {
		questionWrite(question01);
	};

	function answerSelect () {
		stop();
		if ($(this).attr("value") == "correct") {
			solutionWrite(questionsArray[arrayFinder]);
			$(".question").html("Correct!");
			correct++;
			if (arrayFinder < questionsArray.length) {
				setTimeout(function () {questionWrite(questionsArray[arrayFinder])}, 2000);
			}
			else if (arrayFinder < questionsArray.length+1) {
		        setTimeout(function () {endWrite(questionsArray[arrayFinder])}, 2000);
      		}
		}
		else if ($(this).attr("value") == "incorrect") {
			solutionWrite(questionsArray[arrayFinder]);
			$(".question").html("Incorrect!");
			incorrect++;
			if (arrayFinder < questionsArray.length) {
				setTimeout(function () {questionWrite(questionsArray[arrayFinder])}, 2000);
			}
			else if (arrayFinder < questionsArray.length+1) {
		        setTimeout(function () {endWrite(questionsArray[arrayFinder])}, 2000);
      		}
		}
	};

	function endWrite () {
		$(".question").empty();
		$(".content").empty();
		$(".question").html("Here's how you did!");
		$(".content").html("<p> Correct: " + correct + "</p>" + "<p> Incorrect: " + incorrect + "</p>" + "<p> Unanswered: " + unanswered + "</p>");
		var resetButton = $("<button>");
		resetButton.addClass("reset btn btn-default answerBtn");
		resetButton.text("Start Over?");
		$(".content").append(resetButton);
	}

	function resetClick () {
		arrayFinder = 0;
		incorrect = 0;
		correct = 0;
		unanswered = 0;
		startWrite();
	}

	$(document).on("click", ".start", startWrite);

	$(document).on("click", ".answer", answerSelect);

	$(document).on("click", ".reset", resetClick);
// Running Code

start();