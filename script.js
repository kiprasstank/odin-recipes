let humanScore = 0;
let computerScore = 0;
let roundNumber = 0;

function getComputerChoice() {
    const randomNumber = Math.random();
    if (randomNumber < 0.33) {
        return "rock";
    } else if (randomNumber < 0.66) {
        return "paper";
    } else {
        return "scissors";
    }
}

function playRound(humanChoice, computerChoice) {
    roundNumber++;  // Increment round number
    console.log(`Round ${roundNumber}:`);
    console.log(`Computer chose: ${computerChoice}`);
    console.log(`Human chose: ${humanChoice}`);

    if (humanChoice === computerChoice) {
        console.log(`It's a tie! Both chose ${humanChoice}.`);
    } else if (
        (humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'scissors' && computerChoice === 'paper') ||
        (humanChoice === 'paper' && computerChoice === 'rock')
    ) {
        humanScore++;
        console.log(`You win! ${humanChoice} beats ${computerChoice}.`);
    } else {
        computerScore++;
        console.log(`You lose! ${computerChoice} beats ${humanChoice}.`);
    }

    // Log the current scores
    console.log(`Score - Human: ${humanScore}, Computer: ${computerScore}`);
}

function playGame() {
    humanScore = 0;
    computerScore = 0;
    roundNumber = 0;

    for (let round = 1; round <= 5; round++) {
        // Use a closure to capture the round number for delayed execution
        (function(round) {
            setTimeout(() => {
                const humanSelection = prompt("Please enter rock, paper, or scissors:");
                if (humanSelection) {  // Check if the user made a valid input
                    const computerSelection = getComputerChoice();
                    playRound(humanSelection.toLowerCase(), computerSelection);
                } else {
                    console.log("No choice made. Exiting the game.");
                    return;
                }

                // Log the overall winner at the end of the game
                if (round === 5) {
                    if (humanScore > computerScore) {
                        console.log("You are the overall winner!");
                    } else if (computerScore > humanScore) {
                        console.log("The computer is the overall winner!");
                    } else {
                        console.log("It's an overall tie!");
                    }
                }
            }, round * 1000);  // Adjust the delay as necessary (1000 ms = 1 second)
        })(round);
    }
}

playGame();  // Start the game
