$(document).ready(function() {
    // Create a function that creates the start button and open screen
    
    function openingPage() {
    openScreen = "<p class='text-center main-button-container'><a class='btn btn-warning btn-md btn-block start-button' href='#' role='button'>Start</a>";
    $("#mainArea").append(openScreen);
    }
    
    openingPage();
    
    //on-click event for start button to begin
    
    $("#mainArea").on("click", ".start-button", function(event){
    event.preventDefault(); 
    $('.header').hide(); 
    
    generateQuestions();
    
    timerWrapper();
    
    }); // Closes start-button click
    
    $("body").on("click", ".answer", function(event){
    
    selectedAnswer = $(this).text();
    //ternary operator, if/else replacement....if the user's selectedAnswer is equal to the correctAnswers
    selectedAnswer === correctAnswers[questionCount] ? ( 
    //then let the user know it's correct
    clearInterval(theClock),
    generateWin()) :
    //else 
    (//then let the user know it's incorrect
    clearInterval(theClock),
    generateLoss()
    )
    }); // Close .answer click
    
    $("body").on("click", ".reset-button", function(event){
    resetGame();
    }); 
    
    });

    // create variables to keep track of guesses, establish clock, count questions answered
   
    var questionCount = 0;
    var selecterAnswer;
    var theClock;
    var correctGuess = 0;
    var incorrectGuess = 0;
    var unansweredGuess = 0;

    // create variables to store data
   
    var openScreen;
    var triviaHTML;
    var time = 30;

    // create arrays to store question, answers, images, and correct answers

    var questionArray = 
    [ "What color is Trump?", 
    "According to Trump, except for FOX, all news is...?", 
    "How many times have Trump businesses filed for bankruptcy?", 
    "Trump prefers to write tweets that include...", 
    "Trump's 'hair' is...?", 
    "According to Trump, before making a deal it must be:", 
    "Before becoming President, Trump was...", 
    "How many significant pieces of legislation have been passed by the Trump White House?" ];
   
    var answerArray = [
    ["Orange", "Blue", "Green", "Purple"], 
    ["Good","Bad","FAKE!","Informative"], 
    ["0", "1", "2", "6"], 
    ["One's with actual facts", "Unbiased news", "Objective reflections of today's society", "3rd grade grammar and ALL CAPS!!!"], 
    ["Toupe", "Dead cat", "Mix of fur found in Melania's closet", "The broken dreams of sweat shop working children weaved into a wig of malice and greed"], 
    ["Legal","Moral","Ethical","Really really good"], 
    ["Public servant", "Government Official", "Doctor, lawyer, or any other qualified position", "Reality tv star"], 
    ["0","1","-1","If by legislation you mean sitting in a chair in the oval office while repeating Make America Great Again, over and over, then at least 50."], ];
   
    var imageArray = new Array(); 
    imageArray[0] = "<img class='center-block' src='https://www.commondreams.org/sites/default/files/styles/cd_large/public/views-article/orange-trump-955x600_0.jpg?itok=za5K-Zmd'>";
    imageArray[1] = "<img class='center-block' src='https://i.ytimg.com/vi/DlYWXD_5S5g/hqdefault.jpg'>"; 
    imageArray[2] = "<img class='center-block' src='http://static6.uk.businessinsider.com/image/563a077edd0895544a8b46aa/how-donald-trump-used-bankruptcy-to-stay-rich.jpg'>"; 
    imageArray[3] = "<img class='center-block' src='https://cdn.vox-cdn.com/thumbor/gut0iraFfA8HXrBQ_O3-XNX4PI8=/0x0:587x307/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/9987297/Screen_Shot_2018_01_06_at_9.30.25_AM.png'>"; 
    imageArray[4] = "<img class='center-block' src='https://media.gq.com/photos/5ac68bdf0995d03672949444/3:2/w_880/trump-hair.jpg'>"; 
    imageArray[5] = "<img class='center-block' src='http://i0.kym-cdn.com/entries/icons/original/000/021/605/trump_small_hands.jpg'>"; 
    imageArray[6] = "<img class='center-block' src='http://www.azquotes.com/picture-quotes/quote-i-had-a-tv-show-called-the-apprentice-and-it-s-one-of-the-most-successful-reality-shows-donald-trump-153-76-65.jpg'>"; 
    imageArray[7] = "<img class='center-block' src='http://i.perezhilton.com/wp-content/uploads/2018/01/donald-trump-potus-white-house-working-shut-down__oPt.jpg'>"; 
   
    var correctAnswers = 
    [ "A. Orange", 
    "C. FAKE!", 
    "D. 6", 
    "D. 3rd grade grammar and ALL CAPS!!!", 
    "D. The broken dreams of sweat shop working children weaved into a wig of malice and greed", 
    "D. Really really good", 
    "D. Reality tv star", 
    "D. If by legislation you mean sitting in a chair in the oval office while repeating Make America Great Again, over and over, then at least 50."];
    
    // create functions to determine win, loss, time lapse, and generate questions

    function timeoutLoss() {
    unansweredGuess++;
    triviaHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + time + "</span></p>" + "<p class='text-center'>You ran out of time! The correct answer was: " + correctAnswers[questionCount] + "</p>" + "<iframe class='center-block img-wrong' src='https://giphy.com/embed/xTiTnHXbRoaZ1B1Mo8' width='500' height='500' frameBorder='0' allowFullScreen></iframe>";
    $("#mainArea").html(triviaHTML);
    setTimeout(wait, 5000); // lag time to be able to view Trump's stupid face
    }
    
    function generateWin() {
    correctGuess++;
    triviaHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + time + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCount] + "</p>" + imageArray[questionCount];
    $("#mainArea").html(triviaHTML);
    setTimeout(wait, 3000); 
    }
    
    function generateLoss() {
    incorrectGuess++;
    triviaHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + time + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCount] + "</p>" + "<iframe class='center-block img-wrong' src='https://giphy.com/embed/l4FGuhL4U2WyjdkaY' width='500' height='500' frameBorder='0' allowFullScreen></iframe>";
    $("#mainArea").html(triviaHTML);
    setTimeout(wait, 5000); 
    }
   
    function generateQuestions() {
    triviaHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCount] + "</p><p class='first-answer answer'>A. " + answerArray[questionCount][0] + "</p><p class='answer'>B. "+answerArray[questionCount][1]+"</p><p class='answer'>C. "+answerArray[questionCount][2]+"</p><p class='answer'>D. "+answerArray[questionCount][3]+"</p>";
    $("#mainArea").html(triviaHTML);
    }; 
    
    function wait() {
    //ternary operator replacing if/else to generate more questions
    questionCount < 7 ? 
    (questionCount++,
    generateQuestions(),
    time = 30,
    timerWrapper() ):
    
    (finalScreen())
    }; 

    // set interval to keep track of time
    
    function timerWrapper() {
    theClock = setInterval(thirtySeconds, 1000);
    function thirtySeconds() {
    if (time === 0) {
    clearInterval(theClock);
    timeoutLoss();
    }
    if (time > 0) {
    time--;
    }
    $(".timer").html(time);
    }
    }
    
    // create function for end page to display results and create reset

    function finalScreen() {
    triviaHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + time + "</span></p>" + "<p class='text-center'>Here's your score, America!" + "</p>" + "<p class='summary-correct'>Really Really Good Answers: " + correctGuess + "</p>" + "<p>Really Really Bad Answers: " + incorrectGuess + "</p>" + "<p>Unanswered cus your not as smart as Trump: " + unansweredGuess + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset</a></p>";
    $("#mainArea").html(triviaHTML);
    }

    // create function to reset 
    
    function resetGame() {
    questionCount = 0;
    correctGuess = 0;
    incorrectGuess = 0;
    unansweredGuess = 0;
    time = 30;
    generateQuestions();
    timerWrapper();
    }