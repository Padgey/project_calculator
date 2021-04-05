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
const times = document.getElementById("x");
const slash = document.getElementById("/");
const equals = document.getElementById("=");

const clear = document.getElementById("clear");

//Global Variables
let stringToProcess = '';

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["+", "-", "x", "/"];

let parsedValues = [];
let numOfValues = 1;
let parsedOperators = [];


//Operator Functions
const add = function(num1, num2) {
    let sum = num1 + num2;
    return sum
}

const subtract = function(num1, num2) {
    let sum = num1 - num2;
    return sum
}

const multiply = function(num1, num2) {
    let sum = num1 * num2;
    return sum
}

const divide = function(num1, num2) {
    let sum = num1 / num2;
    return sum
}


//Logic
const addValue = function(value) {
    //console.log(`Execute number ${value}...`);

    //console.log(`Appending ${value} to ${stringToProcess}...`);
    stringToProcess += value;

    console.log(`stringToProcess is now: ${stringToProcess}...`);
    display.innerHTML = stringToProcess;
    return
}

const parseString = function() {
    let parsedValueStrings = [];

    for (let i = 0; i < stringToProcess.length; i++) {
        if (numbers.includes(stringToProcess[i])) { //Check if character is a number
            if (!parsedValueStrings[numOfValues]) {
                parsedValueStrings.push("");
                console.log("Creating new parsed value string...")
            };

            parsedValueStrings[(numOfValues - 1)] += stringToProcess[i]
        };

        if (operators.includes(stringToProcess[i])) { //Check if character is operator
            parsedOperators.push(stringToProcess[i]);
            numOfValues++
        };
    };

    parsedValueStrings.forEach(str => {
        parsedValues.push(parseInt(str))
    });

    console.log(`Parsed values: ${parsedValues}`);
    console.log(`numOfValues: ${numOfValues}`);
    console.log(`Parsed operators: ${parsedOperators}`);
}

const executeString = function() {
    let calculatedValue = parsedValues[0];

    for (let i = 0; i < parsedOperators.length; i++) {
        console.log(`Performing ${parsedOperators[i]} operation...`)
        switch (parsedOperators[i]) {
            case "+":
                console.log(`calculatedValue = ${calculatedValue} + ${parsedValues[(i + 1)]}`);
                calculatedValue = add(calculatedValue, parsedValues[(i + 1)]);
                console.log(`calculatedValue = ${calculatedValue}`);
                break
            case "-":
                console.log(`calculatedValue = ${calculatedValue} - ${parsedValues[(i + 1)]}`);
                calculatedValue = subtract(calculatedValue, parsedValues[(i + 1)]);
                console.log(`calculatedValue = ${calculatedValue}`);
                break
            case "x":
                console.log(`calculatedValue = ${calculatedValue} * ${parsedValues[(i + 1)]}`);
                calculatedValue = multiply(calculatedValue, parsedValues[(i + 1)]);
                console.log(`calculatedValue = ${calculatedValue}`);
                break
            case "/":
                console.log(`calculatedValue = ${calculatedValue} / ${parsedValues[(i + 1)]}`);
                calculatedValue = divide(calculatedValue, parsedValues[(i + 1)]);
                console.log(`calculatedValue = ${calculatedValue}`);
                break
            default:
                alert("OperatorError!")
        }
    }

    display.innerHTML = calculatedValue;
}

const calculate = function() {
    parseString();
    executeString();
}

const clearDisplay = function() {
    parsedValues = [];
    numOfValues = 1;
    parsedOperators = [];

    stringToProcess = '';
    display.innerHTML = '';
}

//Event Listeners
zero.addEventListener('click', function() {addValue("0")});
one.addEventListener('click', function() {addValue("1")});
two.addEventListener('click', function() {addValue("2")});
three.addEventListener('click', function() {addValue("3")});
four.addEventListener('click', function() {addValue("4")});
five.addEventListener('click', function() {addValue("5")});
six.addEventListener('click', function() {addValue("6")});
seven.addEventListener('click', function() {addValue("7")});
eight.addEventListener('click', function() {addValue("8")});
nine.addEventListener('click', function() {addValue("9")});

plus.addEventListener('click', function() {addValue("+")});
minus.addEventListener('click', function() {addValue("-")});
times.addEventListener('click', function() {addValue("x")});
slash.addEventListener('click', function() {addValue("/")});

equals.addEventListener('click', calculate);
clear.addEventListener('click', clearDisplay);
