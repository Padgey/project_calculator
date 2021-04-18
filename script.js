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
const leftBracket = document.getElementById("(");
const rightBracket = document.getElementById(")");
const powerOf = document.getElementById("^");
const equals = document.getElementById("=");

const clear = document.getElementById("clear");

const log = document.getElementById("log");

//Global Variables
let stringToProcess = '';

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const operators = ["+", "-", "x", "/", "(", ")", "^"];
const nonMinusOperators = ["+", "x", "/", "(", ")", "^"];
const dmOperators = ["/", "x"];
const asOperators = ["+", "-"];

//Operator Functions
const add = function(num1, num2) {
    let value1;
    let value2;
    if (num1.includes(".")) {
        value1 = parseFloat(num1)
    } else {
        value1 = parseInt(num1)
    };

    if (num2.includes(".")) {
        value2 = parseFloat(num2)
    } else {
        value2 = parseInt(num2)
    };

    let sum = value1 + value2;
    return sum
};
const subtract = function(num1, num2) {
    let value1;
    let value2;
    if (num1.includes(".")) {
        value1 = parseFloat(num1)
    } else {
        value1 = parseInt(num1)
    };

    if (num2.includes(".")) {
        value2 = parseFloat(num2)
    } else {
        value2 = parseInt(num2)
    };

    let sum = value1 - value2;
    return sum
};
const multiply = function(num1, num2) {
    let sum = num1 * num2;
    return sum
};
const divide = function(num1, num2) {
    let sum = num1 / num2;
    return sum
};
const exponential = function(num1, num2) {
    let sum = num1 ** num2;
    return sum
};


//Helper Functions
const reverseString = function(str) {
    let newString = "";
    for (let i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString
};
const retrievePreviousValue = function(stringToProcess, index) {
    let previousValue = "";
    for (let i = index - 1; i >= 0; i--) {
        if (operators.includes(stringToProcess[i])) {
            break
        };
        previousValue += stringToProcess[i];
    };
    previousValue = reverseString(previousValue);
    return previousValue
};
const retrieveNextValue = function(stringToProcess, index) {
    //console.log("Retrieving next value...");
    let nextValue = "";
    //console.log(`nextValue: ${nextValue}`);
    for (let i = index + 1; i < stringToProcess.length; i++) {
        //console.log(`stringToProcess[i]: ${stringToProcess[i]}`);
        if (operators.includes(stringToProcess[i])) {
            break
        };
        //console.log(`${nextValue} + ${stringToProcess[i]}`);
        nextValue += stringToProcess[i];
    };
    //console.log(`Final value retrieved: ${nextValue}`);
    return nextValue
};
const previousValueIsNegative = function(stringToProcess, index) {
    let valueIsNegative = false;
    for (let i = index - 1; i >= 0; i--) {
        if (stringToProcess[i] === "-") {
            valueIsNegative = true;
            break
        } else if (nonMinusOperators.includes(stringToProcess[i])) {
            break
        };
    };
    return valueIsNegative
};
const nextValueIsNegative = function(stringToProcess, index) {
    let valueIsNegative = false;
    if (stringToProcess[index + 1] === "-") {
        valueIsNegative = true;
    }
    return valueIsNegative
};
const retrieveFirstSpliceIndex = function(stringToProcess, index) {
    let firstSpliceIndex = 0;
    for (let i = index - 1; i >= 0; i--) {
        if (operators.includes(stringToProcess[i])) {
            firstSpliceIndex = i;
            break
        };
    };
    return firstSpliceIndex
};
const retrieveSecondSpliceIndex = function(stringToProcess, index) {
    let secondSpliceIndex;
    for (let i = index + 1; i < stringToProcess.length; i++) {
        if (operators.includes(stringToProcess[i])) {
            secondSpliceIndex = i;
            break
        };
    };
    return secondSpliceIndex
};

//Calculation Logic
const bracketsPass = function(stringToProcess) {
    let index = 0;

    //NEED TO FINISH
    while (index < stringToProcess.length) {
        if (stringToProcess[index] === "(") {
            console.log("(")
        } else {
            index++
        }
    }
};
const exponentialPass = function(stringToProcess) {
    let index = 0;

    while (index < stringToProcess.length) {
        if (stringToProcess[index] === "^") {
            //Retrieve the two values and make the calculation
            let valueOne = retrievePreviousValue(index);
            let valueTwo = retrieveNextValue(index);
            let firstSpliceIndex = retrieveFirstSpliceIndex(index);
            let secondSpliceIndex = retrieveSecondSpliceIndex(index);
            let exponentialValue = exponential(valueOne, valueTwo);
            console.log(`valueOne: ${valueOne}`);
            console.log(`valueTwo: ${valueTwo}`);
            console.log(`firstSpliceIndex: ${firstSpliceIndex}`);
            console.log(`secondSpliceIndex: ${secondSpliceIndex}`);
            console.log(`exponentialValue: ${exponentialValue}`);

            //Modify string and place index at the correct place
            let exponentialValueString = exponentialValue.toString();  //Get the value to replace the calculation in the stringToProcess
            let firstStringPart = stringToProcess.slice(0, firstSpliceIndex);
            let secondStringPart = '';
            if (secondSpliceIndex) {        //This ensures that it doesn't look for another operator afterwards if there isn't one
                secondStringPart = stringToProcess.slice(secondSpliceIndex);
            };

            let newStringToProcess = firstStringPart + exponentialValueString + secondStringPart;
            stringToProcess = newStringToProcess;
            index = (firstSpliceIndex -1) + exponentialValueString.length + 1;  //Calculate where the index where the stringToProcess should be analyzed post calculation
            //console.log(`Index on the newStringToProcess to start again on = ${index}`)
        } else {
            index++
        }
    }

    console.log(`Finished exponential pass. stringToProcess: ${stringToProcess}`)
};
const divisionAndMultiplicationPass = function(stringToProcess) {
    let index = 0;

    while (index < stringToProcess.length) {
        //console.log(`Processing index: ${index}`);
        if (stringToProcess[index] === "/" || stringToProcess[index] === "x") {
             //Check if either of the values is negative
             let valueOneIsNegative = previousValueIsNegative(stringToProcess, index);
             let valueTwoIsNegative = nextValueIsNegative(stringToProcess, index);
             //console.log(`valueOneIsNegative: ${valueOneIsNegative}`);
             //console.log(`valueTwoIsNegative: ${valueTwoIsNegative}`);
 
            let valueOne = retrievePreviousValue(stringToProcess, index);
            let valueTwo;
            if (valueTwoIsNegative) {
                valueTwo = retrieveNextValue(stringToProcess, index + 1);
            } else {
                valueTwo = retrieveNextValue(stringToProcess, index);
            };

            let firstSpliceIndex = retrieveFirstSpliceIndex(stringToProcess, index);
            let secondSpliceIndex;
            if (valueTwoIsNegative) {
                secondSpliceIndex = retrieveSecondSpliceIndex(stringToProcess, index + 1);
            } else {
                secondSpliceIndex = retrieveSecondSpliceIndex(stringToProcess, index);
            };

            let operatedValue;
            if (stringToProcess[index] === "/") {
                operatedValue = divide(valueOne, valueTwo);
            } else {
                operatedValue = multiply(valueOne, valueTwo);
            };

            //console.log(`valueOne: ${valueOne}`);
            //console.log(`valueTwo: ${valueTwo}`);
            //console.log(`firstSpliceIndex: ${firstSpliceIndex}`);
            //console.log(`secondSpliceIndex: ${secondSpliceIndex}`);
            //console.log(`operatedValue: ${operatedValue}`);
 
            let operatedValueString = operatedValue.toString();  //Get the value to replace the calculation in the stringToProcess
            let firstStringPart = stringToProcess.slice(0, firstSpliceIndex);
            let secondStringPart = '';
            //This ensures that it doesn't look for another operator afterwards if there isn't one
            if (secondSpliceIndex) {        
                secondStringPart = stringToProcess.slice(secondSpliceIndex);
            };

            if ((valueOneIsNegative === false && valueTwoIsNegative === false) || (valueOneIsNegative === true && valueTwoIsNegative === true)) {
                stringToProcess = firstStringPart + "+" + operatedValueString + secondStringPart;
            } else {
                stringToProcess = firstStringPart + "-" + operatedValueString + secondStringPart;
            };
            //console.log(stringToProcess);

            index = (firstSpliceIndex -1) + operatedValueString.length + 1;

        } else {

            index++

        }
    };

    console.log(`Finished division and multiplication pass. stringToProcess: ${stringToProcess}`);

    return stringToProcess
};
const additionAndSubtractionPass = function(stringToProcess) {
    //console.log(`stringToProcess preProcessingStartingSumOperators: ${stringToProcess}`);
    //processStartingSumOperators(stringToProcess);
    //console.log(`stringToProcess: ${stringToProcess}`);

    let sum = 0;
    let positiveStrings = [];
    let negativeStrings = [];
    //console.log(`sum: ${sum}\n positiveStrings: ${positiveStrings}\n negativeStrings: ${negativeStrings}`);

    if (operators.includes(stringToProcess[0])) {                       //Fix stringToProcess so that first value is correctly interpreted
        stringToProcess = "0" + stringToProcess
    } else {
        stringToProcess = "0+" + stringToProcess
    };

    //console.log(`stringToProcess: ${stringToProcess}`);

    for (let index = 0; index < stringToProcess.length; index++) {    
        //console.log(`Processing index: ${index} - ${stringToProcess[index]}`);  
        
        //Extract positive and negative strings
        if (stringToProcess[index] === "+") {
            //console.log("Pushing positive value...");
            positiveStrings.push(retrieveNextValue(stringToProcess, index))
        };
        if (stringToProcess[index] === "-") {
            //console.log("Pushing negative value...");
            negativeStrings.push(retrieveNextValue(stringToProcess, index))
        };
    };

    //console.log(`sum: ${sum}\n positiveStrings: ${positiveStrings}\n negativeStrings: ${negativeStrings}`);

    let positiveValues = [];                            //Convert strings to values
    let negativeValues = [];
    positiveStrings.forEach(string => {                 
        let value;
        if (!string.includes(".")) {
            value = parseInt(string);
        } else {
            value = parseFloat(string);
        };
        positiveValues.push(value)
    });
    negativeStrings.forEach(string => {
        let value;
        if (!string.includes(".")) {
            value = parseInt(string);
        } else {
            value = parseFloat(string);
        };
        negativeValues.push(value)
    });

    positiveValues.forEach(value => {                   //Calculate sum
        sum += value;
    });
    negativeValues.forEach(value => {
        sum -= value;
    });

    let finalString = sum.toString();
    stringToProcess = finalString;
    console.log(`Finished addition and subtraction pass. stringToProcess: ${stringToProcess}`);

    return stringToProcess
};
const calculateBodmas = function(stringToProcess) {
    let initialString = stringToProcess;

    //exponentialPass(stringToProcess);
    stringToProcess = divisionAndMultiplicationPass(stringToProcess);
    stringToProcess = additionAndSubtractionPass(stringToProcess);

    let calculatedString = stringToProcess;
    let stringToLog = initialString + "=" + calculatedString;
    let elementToDisplay = document.createElement("P");
    elementToDisplay.innerHTML = stringToLog;
    log.insertBefore(elementToDisplay, log.firstChild);

    return stringToProcess
};

//Syntax Logic
const processStartingSumOperators = function(stringToProcess) {
    if (stringToProcess[0] === "+" || stringToProcess[0] === "-") {             //Append 0 to start of string for processing strings starting with + or -
        stringToProcess = "0" + stringToProcess;                                //Is this necessary? Already do this elsewhere - may remove later
    };
};
const processInappropriateStartOrEndOperators = function(stringToProcess) {
    if (dmOperators.includes(stringToProcess[0]) || operators.includes(stringToProcess[(stringToProcess.length - 1)])) { //Check if starts or ends with 
        console.log("Syntax Error - stringToProcess begins or ends with an inappropriate operator");                     //inappropriate operators
        stringToProcess = "Syntax Error!";
    };
};
const processInappropriateConsecutiveOperators = function(stringToProcess) {
    for (let i = 0; i < stringToProcess.length; i++) {
        if (dmOperators.includes(stringToProcess[i]) && dmOperators.includes(stringToProcess[(i + 1)])) {      //Check for consecutive x or / operators
            console.log("Syntax Error - stringToProcess contains two consecutive x or / operators")
            stringToProcess = "Syntax Error!";
        }
    };
};
const processConsecutiveSumOperators = function(stringToProcess) {
    //console.log("Processing string for consecutive sum operators...")
    let i = 0;
    while (i < stringToProcess.length - 1) {
        let thisCharacter = stringToProcess[i];
        let nextCharacter = stringToProcess[i + 1];
        if (thisCharacter === "+" && nextCharacter === "+") {
            stringToProcess = stringToProcess.slice(0, i) + "+" + stringToProcess.slice(i + 2); 
        } else if (thisCharacter === "+" && nextCharacter === "-") {
            stringToProcess = stringToProcess.slice(0, i) + "-" + stringToProcess.slice(i + 2);
        } else if (thisCharacter === "-" && nextCharacter === "+") {
            stringToProcess = stringToProcess.slice(0, i) + "-" + stringToProcess.slice(i + 2);
        } else if (thisCharacter === "-" && nextCharacter === "-") {
            stringToProcess = stringToProcess.slice(0, i) + "+" + stringToProcess.slice(i + 2);
        } else {
            i++
        }
    }
    //console.log(`stringToProcess post processing for consecutive sum operators: ${stringToProcess}`)
};
const processMultipleDecimalsInValue = function(stringToProcess) {
    let numDecimalInOneValue = 0;
    for (let i = 0; i < stringToProcess.length; i++) {
        if (stringToProcess[i] === ".") {
            numDecimalInOneValue++
        } else if (operators.includes(stringToProcess[i])) {
            numDecimalInOneValue = 0;
            continue
        }
        if (numDecimalInOneValue > 1) {
            stringToProcess = "Syntax Error!";
            console.log("Syntax Error - stringToProcess has more than one decimal in a value")
            break
        }

    }
};
const checkSyntax = function(stringToProcess) {
    console.log("________________________________________")
    console.log(`Processing ${stringToProcess}...`);
    processInappropriateStartOrEndOperators(stringToProcess);
    processInappropriateConsecutiveOperators(stringToProcess);
    processConsecutiveSumOperators(stringToProcess);   //Process string to be able to handle multiple consecutive plus or minus operators
    processMultipleDecimalsInValue(stringToProcess);                  
};

//Calculator Interface Logic
const addValueToDisplay = function(value) {
    if (display.innerText === "Calculation rendered here...") {
        display.innerText = '';
    }
    let stringToProcess = display.innerText;
    stringToProcess += value;
    display.innerText = stringToProcess;
    return
};
const calculate = function() {
    let stringToProcess = display.innerText;
    checkSyntax(stringToProcess);
    if (stringToProcess !== "Syntax Error!") {
        stringToProcess = calculateBodmas(stringToProcess);
    }
    display.innerHTML = stringToProcess
};
const clearDisplay = function() {
    display.innerHTML = 'Calculation rendered here...';
};

//Event Listeners
zero.addEventListener('click', function() {addValueToDisplay("0")});
one.addEventListener('click', function() {addValueToDisplay("1")});
two.addEventListener('click', function() {addValueToDisplay("2")});
three.addEventListener('click', function() {addValueToDisplay("3")});
four.addEventListener('click', function() {addValueToDisplay("4")});
five.addEventListener('click', function() {addValueToDisplay("5")});
six.addEventListener('click', function() {addValueToDisplay("6")});
seven.addEventListener('click', function() {addValueToDisplay("7")});
eight.addEventListener('click', function() {addValueToDisplay("8")});
nine.addEventListener('click', function() {addValueToDisplay("9")});

decimal.addEventListener('click', function() {addValueToDisplay(".")});

plus.addEventListener('click', function() {addValueToDisplay("+")});
minus.addEventListener('click', function() {addValueToDisplay("-")});
times.addEventListener('click', function() {addValueToDisplay("x")});
slash.addEventListener('click', function() {addValueToDisplay("/")});
powerOf.addEventListener('click', function() {addValueToDisplay("^")});

equals.addEventListener('click', calculate);
clear.addEventListener('click', clearDisplay);