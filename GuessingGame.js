 var Game = function () {
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
}

function generateWinningNumber() {
    return Math.ceil(Math.random()*100);
}

function newGame () {
	return new Game();
}


Game.prototype.difference = function () {
	return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function () {
	return this.playersGuess < this.winningNumber; 
}

Game.prototype.playersGuessSubmission = function (num) {
	if(num < 1 || num > 100 || !Number.isInteger(num)) {
        $('#message').text("That is an invalid guess.");
		throw "That is an invalid guess."
	} 
	this.playersGuess = num;
	return this.checkGuess();
}
 
Game.prototype.checkGuess = function () {
	if(this.playersGuess === this.winningNumber) {
        $('.disable').prop("disabled", "true");
        $('#message').text("Press the Reset button to play again!");
        $('#title').text("YOU WIN!").addClass("finalOutcome win");
        $('body').css({'background-color':'#b72537'});
		return "Way to Go!";
	} 
	else {
		if(this.pastGuesses.indexOf(this.playersGuess) > -1) {
			return "You have already guessed that number."; 
		} else if (this.pastGuesses.indexOf(this.playersGuess) === -1 && Number.isInteger(this.playersGuess)){
			this.pastGuesses.push(this.playersGuess);
            var entry = '#entry' + this.pastGuesses.length;
            $(entry).text(this.playersGuess);
            
			if(this.pastGuesses.length === 5) {
				$('.disable').prop("disabled", true);
                $('#message').text("Press the Reset button to play again!");
                $('#title').text("YOU LOSE").addClass("finalOutcome");
                
                return "Womp Womp. The winning Number was " + this.winningNumber + ".";
			}
			else {
				var diff = this.difference();
                if(this.isLower()) {
                    $("#message").text("Guess Higher!");
                } else {
                    $("#message").text("Guess Lower!");
                }
                if(diff < 2) {
                    $('body').css({'background-color':'#b72551'});
                    $("#feedback").text("You are hot hot hot!");
                } else if(diff < 5) {
                    $('body').css({'background-color':'#b72574'});
                    $("#feedback").text("Ouch! So Hot!");
                } else if(diff < 10) {
                    $('body').css({'background-color':'#b72597'});
                    $("#feedback").text("You are burning up!");
                } else if(diff < 15) {
                    $('body').css({'background-color':'#b425b7'});
                    $("#feedback").text("Oof! It's getting warm in here!");
                } else if(diff < 20) {
                    $('body').css({'background-color':'#9125b7'});
                    $("#feedback").text("You are kinda almost warm?");
                } else if(diff < 40) {
                    $('body').css({'background-color':'#6e25b7'});
                    $("#feedback").text("You are a bit chilly");
                } else if(diff < 50) {
                    $('body').css({'background-color':'#4b25b7'});
                    $("#feedback").text("Brrrrrrrr!");
                }else if(diff < 60) {
                    $('body').css({'background-color':'#252bb7'});
                    $("#feedback").text("You are as cold as a popsicle!");
                }else if(diff < 90) {
                    $('body').css({'background-color':'#254eb7'});
                    $("#feedback").text("You are basically frozen");
                }
            }
        }
    }
}


Game.prototype.provideHint = function () {
	var hintarr = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
	 return shuffle(hintarr);
}

function shuffle (arr) {
	var m = arr.length, t, i;
	while (m) {
		i = Math.floor(Math.random() * m --);
		temp = arr [m];
		arr[m] = arr[i];
		arr[i] = temp;
	}

	return arr;
}


///

function makeAGuess (game) {
    var guess = $('#player-input').val();
    $('#player-input').val("");
    var output = game.playersGuessSubmission(parseInt(guess,10));
    $('#feedback').text(output);
}

$(document).ready(function () {
    var game = newGame();
    
    $('#submit').click( function () {
        makeAGuess(game);
    });
    
    $('#player-input').keypress(function(event) {
        if(event.which == 13) {
            makeAGuess(game);
        }
    });
    
    $('#hint').click( function () {
        var hints = game.provideHint();
        $('#message').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2] + '.');
    });
    
    $('#reset').click( function () {
        game = newGame();
        $('.disable').prop("disabled", false);
        $('#title').text("GUESSING GAME").removeClass("finalOutcome win");
        $('#message').text("Guess a number between 1-100");
        $('#feedback').text("You got this!");
        $('#entry1, #entry2, #entry3, #entry4, #entry5').html('&nbsp;')
        $('#hint, #submit').prop("disabled",false);
        $('body').css({'background-color':'#2547b7'});
    });

});





