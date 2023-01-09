'use strict';

//All divs with square class
const squareEl = document.querySelectorAll('.square');
//All divs with mole class
const timeLeft = document.querySelector('#js-whack-time-left');
const scoreEl = document.querySelector('#js-whack-score');
//Start button
const startEl = document.querySelector('#js-whack-start');
//All radio inputs for speed
const inputEl = document.querySelectorAll('.js-whack-input');
//All radio inputs for time interval
const timeEl = document.querySelectorAll('.js-whack-int');

let result = 0;
let hitPosition = 0;
let currentTime = 10;
let selectedTime = 10;
let timerId = null;
let timeInterval = 1000;

adjustTime();

//Function to randomly select a square in the grid
function randomSquare() {
    //Remove mole class from all divs in our grid
    squareEl.forEach(className => {
        className.classList.remove('mole');
    })
    let randomSquare = squareEl[Math.floor(Math.random()*9)];
    randomSquare.classList.add('mole');
    //Assign the id of the randomPosition to hitPosition to use it later
    hitPosition = randomSquare.id;
}

//Add even listener to each square in the grid
squareEl.forEach(square => {
    square.addEventListener('click', (event) =>{
        if(square.id === hitPosition){
            result += 1;
            scoreEl.innerHTML = result;
        }
    })
})

//Function to change speed
function adjustSpeed() {
    //Add event listener to each input
    inputEl.forEach(input=> {
        input.addEventListener('click', () => {
            if(input.id === 'low'){
                timeInterval = 1000;
            }else if(input.id === 'medium'){
                timeInterval = 800;
            }else if(input.id === 'super'){
                timeInterval = 600;
            }
        })
    })
}

//Function to change time interval
function adjustTime() {
    //Add event listener to each input
    timeEl.forEach(input=> {
        input.addEventListener('click', () => {
            if(input.id === '10'){
                selectedTime = 10;
                timeLeft.innerHTML = selectedTime;
            }else if(input.id === '20'){
                selectedTime = 20;
                timeLeft.innerHTML = selectedTime;
            }else if(input.id === '30'){
                selectedTime = 30;
                timeLeft.innerHTML = selectedTime;
            }
        })
    })
}


let countDownTimerId = null;
//Function for time left
function countDown() {
    //Decrease value by one
    currentTime--;
    //Adjust time
    adjustTime();
    console.log(currentTime)
    //Update timer
    timeLeft.innerHTML = currentTime;
    if(currentTime === 0){
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        showAlert(result);
        squareEl.forEach(className => {
            className.classList.remove('mole');
        })
    }
}

//Function to adjust speed by users choice
adjustSpeed();

adjustTime();


startEl.addEventListener('click', () => {
    currentTime = selectedTime;
    result = 0;
    //Function to move mole randomly
    timerId = setInterval(randomSquare, timeInterval);
    countDownTimerId = setInterval(countDown, 1000);
})


function showAlert(value) {
    const alertBox = document.createElement('div');
    alertBox.setAttribute('class', 'js-alert-box');
    const alertBoxText = document.createElement('p');
    alertBoxText.setAttribute('class', 'js-alert-text')
    const alertBoxMsg = document.createTextNode('Game is over! Your final result is ' + value);
    alertBoxText.appendChild(alertBoxMsg);
    const alertBtn = document.createElement('button');
    alertBtn.setAttribute('class', 'js-alert-btn');
    const alertBtnMsg = document.createTextNode('Try again');
    alertBtn.appendChild(alertBtnMsg);
    alertBox.appendChild(alertBoxText);
    alertBox.appendChild(alertBtn);
    const body = document.querySelector('body');
    body.appendChild(alertBox);
    alertBtn.addEventListener('click', ()=>{
        alertBox.classList.add('js-remove');
        alertBox.classList.remove('js-alert-box');
        result = 0;
        scoreEl.innerHTML = result;
        currentTime = selectedTime;
        timeLeft.innerHTML = selectedTime;
    })
}
