//DOM setup
const display = document.getElementById("display");

const one = document.getElementById("1");
const two = document.getElementById("2");
const three = document.getElementById("3");
const four = document.getElementById("4");
const five = document.getElementById("5");
const six = document.getElementById("6");
const seven = document.getElementById("7");
const eight = document.getElementById("8");
const nine = document.getElementById("9");
const zero = document.getElementById("0");

const decimal = document.getElementById(".");

const plus = document.getElementById("+");
const minus = document.getElementById("-");
const multiply = document.getElementById("x");
const divide = document.getElementById("/");
const equals = document.getElementById("=");

const clear = document.getElementById("clear");

//Logic
let stringToProcess = '';

const addValue = function(value) {
    //console.log(`Execute number ${value}...`);

    //console.log(`Appending ${value} to ${stringToProcess}...`);
    stringToProcess += value;

    console.log(`stringToProcess is now: ${stringToProcess}...`);
    return
}

const executeString = function() {
    for (let i = 0; i < stringToProcess.length; i++) {
        
    }
}

//Event Listeners
one.addEventListener('click', function() {addValue("1")});
two.addEventListener('click', function() {addValue("2")});

plus.addEventListener('click', function() {addValue("+")});

equals.addEventListener('click', executeString);
