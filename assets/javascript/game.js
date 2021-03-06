// Create array of crystal button images
// Numbered out of order because I want the images with dual crystals on the outside edges
var crystalImages = ["assets/images/crystalButton2.png", "assets/images/crystalButton1.png", "assets/images/crystalButton4.png", "assets/images/crystalButton3.png"];

// Set initial variables
var wins = 0;
var losses = 0;
var numberToGuess = 0;
var userTotal = 0;

// Call function to begin the game
beginGame();

// Define function to begin the game
function beginGame() {
    // Generate the random number to guess - per the Homework Instructions: 'The random number shown at the start of the game should be between 19 - 120.'
    numberToGuess = Math.floor(Math.random() * 102) + 19;
    // Display the random number on the page in the #number-to-guess span
    $("#number-to-guess").text(numberToGuess);
    // Reset the player's total even after a game has been played through
    userTotal = 0;
    // Display the player's total on the page in the #total-score span for each iteration of clickCrystal and beginGame
    $("#user-total").text(userTotal);

    // Iterate through the length of the crystal images array to generate img tags for each crystal, add source attributes, add classes, and assign random number values
    for (i = 0; i < crystalImages.length; i++) {
        // Create an HTML img tag for each crystal button
        var crystalBtn = $("<img>");
        // Add class crystal-image to each new img tag so we can style and size them
        crystalBtn.addClass("crystal-image");
        // Add src attribute to each img tag equal to the 'URL' we assigned in the crystalImages array
        crystalBtn.attr("src", crystalImages[i]);
        // Add 'data-' attribute to each img tag equal to a random number so we can reference that value when a player clicks on a crystal - per the Homework Instructions: 'Each crystal should have a random hidden value between 1 - 12.'
        crystalBtn.attr("data-crystalvalue", Math.floor(Math.random() * 12) + 1);

        // Add a unique id to the 2 right-most images so I can float them right in the stylesheet and make a space in the middle
        // i > 1 and i < crystalImages.length (4) limits the images that receive the id to the last 2 in the array - the right-most two images
        if (i > 1 && i < crystalImages.length) {
            // Attribute 
            crystalBtn.attr("id", "img" + i);
        }
        // Append all of the img tags we just made and their attributes/classes to the div with ID #crystals on the HTML
        $("#crystals").append(crystalBtn);
    };

    // Call clickCrystal function by clicking on any img with the class of .crystal-image to begin assessment of crystal values
    $(".crystal-image").on("click", clickCrystal);

    // Notes to future self:
    // Figure out a way to prevent Math.random from assigning the same data value to more than 1 crystal
    //
    // Figure out a way to ensure that at least one of the crystals always has a value of 1, just as a win 'fail-safe'
    //
};

// Define function to collect data from user clicks on crystals for comparison to randomly generated number to guess
function clickCrystal() {
    // Clear game-over span if it's populated by a previous win or loss
    $("#game-over").html("<h2><strong> ------------------------------ </strong></h2>");
    // Assign the randomly generated number from the crystals clicked on to a variable - see final statement of beginGame function
    var crystalValue = ($(this).attr("data-crystalvalue"));
    // Values returned from an ID are strings, so convert them to an integer
    crystalValue = parseInt(crystalValue);
    // Reassign the player's total to each starting value + the value from each crystal a player clicks on
    userTotal = userTotal + crystalValue;
    // Display the player's score on the page
    $("#user-total").text(userTotal);
    // Add win condition for when the player's total score is exactly equal to the randomly generated number to guess
    if (userTotal === numberToGuess) {
        // Publish win text to HTML
        $("#game-over").html("<h4><strong> You've acheived a perfect balance of energy, allowing you to exist in all realms simultaneously. Hallowed are the Autumn People. </strong></h4>");
        // Increment the number of wins by 1 for score keeping
        wins++;
        // Publish the number of wins to the respective span in the HTML
        $("#wins").text(wins);
        // Empty the div that holds the crystal images and their associated values to 'start the game over'
        $("#crystals").empty();
        // Call beginGame function to restart
        beginGame();
    }
    // Add loss condition for when the player's total score is over the randomly generated number to guess
    else if (userTotal > numberToGuess) {
        // Publish loss text to HTML
        $("#game-over").html("<h4><strong> You've exceeded allowable Psionic energy levels and opened a portal to the Underverse. The Shadow Children come pouring out and ravage the Earth.</strong></h4>");
        // Increment the number of losses by 1 for score keeping
        losses++;
        // Publish the number of losses to the respective span in the HTML
        $("#losses").text(losses);
        // Empty the div that holds the crystal imges and their associated values to 'start the game over'
        $("#crystals").empty();
        // Call beginGame function to restart
        beginGame();
    }
};