const flashcards = [
{
question:"What does HTML stand for?",
answer:"Hyper Text Markup Language"
},
{
question:"What does CSS stand for?",
answer:"Cascading Style Sheets"
},
{
question:"What is JS?",
answer:"JavaScript"
},
{
question:"What is DBMS?",
answer:"Database Management System"
}
];

let currentCard = 0;
let showingAnswer = false;

const cardText = document.getElementById("cardText");

function flipCard(){

    if(showingAnswer){
        cardText.innerText =
        flashcards[currentCard].question;
    } else {
        cardText.innerText =
        flashcards[currentCard].answer;
    }

    showingAnswer = !showingAnswer;
}

function nextCard(){

    currentCard++;

    if(currentCard >= flashcards.length){
        currentCard = 0;
    }

    cardText.innerText =
    flashcards[currentCard].question;

    showingAnswer = false;
}