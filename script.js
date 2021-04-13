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
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const operators = ["+", "-", "x", "/", "(", ")", "^"];
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
        if (stringToProcess[i] === "-" && i === 0) {
            previousValue += stringToProcess[i];
            break
        }
        if (operators.includes(stringToProcess[i])) {
            break
        };
        previousValue += stringToProcess[i];
    };
    previousValue = reverseString(previousValue);
    return previousValue
};
const retrieveNextValue = function(stringToProcess, index) {
    let nextValue = "";
    for (let i = index + 1; i < stringToProcess.length; i++) {
        if (operators.includes(stringToProcess[i])) {
            break
        };
        nextValue += stringToProcess[i];
    };
    return nextValue
};
const retrieveFirstSpliceIndex = function(stringToProcess, index) {
    let firstSpliceIndex = 0;
    for (let i = index - 1; i >= 0; i--) {
        if (operators.includes(stringToProcess[i])) {
            firstSpliceIndex = i + 1;
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
const bracketsPass = function() {
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
            let valueOne = retrievePreviousValue(stringToProcess, index);
            let valueTwo = retrieveNextValue(stringToProcess, index);
            let firstSpliceIndex = retrieveFirstSpliceIndex(stringToProcess, index);
            let secondSpliceIndex = retrieveSecondSpliceIndex(stringToProcess, index);
            let exponentialValue = exponential(valueOne, valueTwo);
            //console.log(`valueOne: ${valueOne}`);
            //console.log(`valueTwo: ${valueTwo}`);
            //console.log(`firstSpliceIndex: ${firstSpliceIndex}`);
            //console.log(`secondSpliceIndex: ${secondSpliceIndex}`);
            //console.log(`exponentialValue: ${exponentialValue}`);

            //Modify string and place index at the correct place
            let exponentialValueString = exponentialValue.toString();  //Get the value to replace the calculation in the stringToProcess
            let firstStringPart = stringToProcess.slice(0, firstSpliceIndex);
            let secondStringPart = '';
            if (secondSpliceIndex) {        //This ensures that it doesn't look for another operator afterwards if there isn't one
                secondStringPart = stringToProcess.slice(secondSpliceIndex);
            };

            stringToProcess = firstStringPart + exponentialValueString + secondStringPart;
            index = (firstSpliceIndex -1) + exponentialValueString.length + 1;  //Calculate where the index where the stringToProcess should be analyzed post calculation
            //console.log(`Index on the newStringToProcess to start again on = ${index}`)
        } else {
            index++
        }
    }

    //console.log(`Finished exponential pass. stringToProcess: ${stringToProcess}`)
    return stringToProcess
};
const divisionAndMultiplicationPass = function(stringToProcess) {                              //NEED TO FIX DIVISION AND MULTIPLICATION WITH NEGATIVES
    let index = 0;

    while (index < stringToProcess.length) {
        //console.log(`Processing index: ${index}`);
        if (stringToProcess[index] === "/") {
            //Retrieve the two values and make the calculation
            let valueOne = retrievePreviousValue(stringToProcess, index);
            let valueTwo = retrieveNextValue(stringToProcess, index);
            let firstSpliceIndex = retrieveFirstSpliceIndex(stringToProcess, index);
            let secondSpliceIndex = retrieveSecondSpliceIndex(stringToProcess, index);
            let dividedValue = divide(valueOne, valueTwo);

            //Modify string and place index at the correct place
            let dividedValueString = dividedValue.toString();  //Get the value to replace the calculation in the stringToProcess
            let firstStringPart = stringToProcess.slice(0, firstSpliceIndex);
            let secondStringPart = '';
            if (secondSpliceIndex) {        //This ensures that it doesn't look for another operator afterwards if there isn't one
                secondStringPart = stringToProcess.slice(secondSpliceIndex);
            };

            stringToProcess = firstStringPart + dividedValueString + secondStringPart;
            index = (firstSpliceIndex -1) + dividedValueString.length + 1;  //Calculate where the index where the stringToProcess should be analyzed post calculation
            //console.log(`Index on the newStringToProcess to start again on = ${index}`)
        } else if (stringToProcess[index] === "x") {
            //Retrieve the two values and make the calculation
            let valueOne = retrievePreviousValue(stringToProcess, index);
            let valueTwo = retrieveNextValue(stringToProcess, index);
            let firstSpliceIndex = retrieveFirstSpliceIndex(stringToProcess, index);
            let secondSpliceIndex = retrieveSecondSpliceIndex(stringToProcess, index);
            let multipliedValue = multiply(valueOne, valueTwo);

            //Modify string and place index at the correct place
            let multipliedValueString = multipliedValue.toString();  //Get the value to replace the calculation in the stringToProcess
            let firstStringPart = stringToProcess.slice(0, firstSpliceIndex);
            let secondStringPart = '';
            if (secondSpliceIndex) {        //This ensures that it doesn't look for another operator afterwards if there isn't one
                secondStringPart = stringToProcess.slice(secondSpliceIndex);
            };

            stringToProcess = firstStringPart + multipliedValueString + secondStringPart;
            index = (firstSpliceIndex -1) + multipliedValueString.length + 1;  //Calculate where the index where the stringToProcess should be analyzed post calculation
            //console.log(`Index on the newStringToProcess to start again on = ${index}`)
        } else {
            index++
        }
    }
    //console.log(`Finished division and multiplication pass. stringToProcess: ${stringToProcess}`);
    return stringToProcess
};
const additionAndSubtractionPass = function(stringToProcess) {
    let sum = 0;
    let positiveStrings = [];
    let negativeStrings = [];

    if (operators.includes(stringToProcess[0])) {     //Fix stringToProcess so that first value is correctly interpreted               
        stringToProcess = "0" + stringToProcess
    } else {
        stringToProcess = "0+" + stringToProcess
    };

    for (let index = 0; index < stringToProcess.length; index++) {      //Extract positive and negative strings
        if (stringToProcess[index] === "+") {
            positiveStrings.push(retrieveNextValue(stringToProcess, index))
        };
        if (stringToProcess[index] === "-") {
            negativeStrings.push(retrieveNextValue(stringToProcess, index))
        };
    };

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

    stringToProcess = sum.toString();
    //console.log(`Finished addition and subtraction pass. stringToProcess: ${stringToProcess}`);
    return stringToProcess
};
const calculateBodmas = function(stringToProcess) {
    let initialString = stringToProcess;
    //console.log(`Calculating BODMAS calculations for ${stringToProcess}...`)

    stringToProcess = exponentialPass(stringToProcess);
    stringToProcess = divisionAndMultiplicationPass(stringToProcess);
    stringToProcess = additionAndSubtractionPass(stringToProcess);

    let calculatedString = stringToProcess;
    logCalculation(initialString, calculatedString);
    return stringToProcess
};

//Syntax Logic
const processStartingSumOperators = function(string) {
    if (string[0] === "+" || string[0] === "-") {             //Append 0 to start of string for processing strings starting with + or -
        string = "0" + string;                                //Is this necessary? Already do this elsewhere - may remove later
    };
    return string
};
const processInappropriateStartOrEndOperators = function(string) {
    if (dmOperators.includes(string[0]) || operators.includes(string[(string.length - 1)])) { //Check if starts or ends with 
        //console.log("Syntax Error - stringToProcess begins or ends with an inappropriate operator");                     //inappropriate operators
        string = "Syntax Error!";
    };
    return string
};
const processInappropriateConsecutiveOperators = function(string) {
    for (let i = 0; i < string.length; i++) {
        if (dmOperators.includes(string[i]) && dmOperators.includes(string[(i + 1)])) {      //Check for consecutive x or / operators
            //console.log("Syntax Error - stringToProcess contains two consecutive x or / operators")
            string = "Syntax Error!";
        }
        return string
    };
};
const processConsecutiveSumOperators = function(string) {
    let i = 0;
    while (i < string.length - 1) {
        let thisCharacter = string[i];
        let nextCharacter = string[i + 1];
        if (thisCharacter === "+" && nextCharacter === "+") {
            string = string.slice(0, i) + "+" + string.slice(i + 2); 
        } else if (thisCharacter === "+" && nextCharacter === "-") {
            string = string.slice(0, i) + "-" + string.slice(i + 2);
        } else if (thisCharacter === "-" && nextCharacter === "+") {
            string = string.slice(0, i) + "-" + string.slice(i + 2);
        } else if (thisCharacter === "-" && nextCharacter === "-") {
            string = string.slice(0, i) + "+" + string.slice(i + 2);
        } else {
            i++
        }
    }
    return string
};
const processMultipleDecimalsInValue = function(string) {
    let numDecimalInOneValue = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] === ".") {
            numDecimalInOneValue++
        } else if (operators.includes(string[i])) {
            numDecimalInOneValue = 0;
            continue
        }
        if (numDecimalInOneValue > 1) {
            string = "Syntax Error!";
            //console.log("Syntax Error - stringToProcess has more than one decimal in a value")
            break
        }

    }
    return string
};
const checkSyntax = function(stringToProcess) {
    //console.log("________________________________________")
    //console.log(`Processing ${stringToProcess}...`);
    //console.log("Checking Syntax...")
    stringToProcess = processStartingSumOperators(stringToProcess);
    stringToProcess = processInappropriateStartOrEndOperators(stringToProcess);
    stringToProcess = processInappropriateConsecutiveOperators(stringToProcess);
    stringToProcess = processConsecutiveSumOperators(stringToProcess);   //Process string to be able to handle multiple consecutive plus or minus operators
    stringToProcess = processMultipleDecimalsInValue(stringToProcess);
    //console.log(`Checked syntax stringToProcess is now: ${stringToProcess}`);
    return stringToProcess                  
};

//Calculator Interface Logic
const addValueToDisplay = function(value) {
    if (display.innerText == "Calculation rendered here...") {
        display.innerText = ''
    };
    display.innerHTML += value;
    return
};
const logCalculation = function(initialString, calculatedString) {
    let stringToLog = initialString + "=" + calculatedString;
    let elementToDisplay = document.createElement("P");
    elementToDisplay.innerHTML = stringToLog;
    log.insertBefore(elementToDisplay, log.firstChild);
};
const executeCalculation = function() {
    let stringToProcess = display.innerHTML;
    stringToProcess = calculate(stringToProcess)
    display.innerHTML = stringToProcess
};
const calculate = function(stringToProcess) {
    stringToProcess = checkSyntax(stringToProcess);
    if (stringToProcess !== "Syntax Error!") {
        stringToProcess = calculateBodmas(stringToProcess);
    }
    return stringToProcess
}
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

equals.addEventListener('click', executeCalculation);
clear.addEventListener('click', clearDisplay);

//Testing Suite - Who needs mocha anyway?//
console.log("________________________");
console.log("Execute testing suite...");

console.log(`x2+2 should equal Syntax Error! -      x2+2=${calculate("x2+2")}          ${calculate("x2+2") === "Syntax Error!"}`);
console.log(`2+2x should equal Syntax Error! -      2+2x=${calculate("2+2x")}          ${calculate("2+2x") === "Syntax Error!"}`);
console.log(`2+2x should equal Syntax Error! -      2+2x=${calculate("2+2x")}          ${calculate("2+2x") === "Syntax Error!"}`);
console.log(`2.2.2+2 should equal Syntax Error! -   2.2.2+2=${calculate("2.2.2+2")}       ${calculate("2.2.2+2") === "Syntax Error!"}`);

console.log(`2+2 should equal 4 -      2+2=${calculate("2+2")}          ${calculate("2+2") === "4"}`);
console.log(`2-1 should equal 1 -      2-1=${calculate("2-1")}          ${calculate("2-1") === "1"}`);
console.log(`2x2 should equal 4 -      2x2=${calculate("2x2")}          ${calculate("2x2") === "4"}`);
console.log(`2/2 should equal 1 -      2/2=${calculate("2/2")}          ${calculate("2/2") === "1"}`);

console.log(`1/2 should equal 0.5 -    1/2=${calculate("1/2")}        ${calculate("1/2") === "0.5"}`);
console.log(`0.5+0.75 equals 0.5 -     0.5+0.75=${calculate("0.5+0.75")}  ${calculate("0.5+0.75") === "1.25"}`);
console.log(`-2+1 should equal -1 -    -2+1=${calculate("-2+1")}        ${calculate("-2+1") === "-1"}`);
console.log(`-2+3 should equal 1 -     -2+3=${calculate("-2+3")}         ${calculate("-2+3") === "1"}`);
console.log(`-2-5 should equal -7 -    -2-5=${calculate("-2-5")}        ${calculate("-2-5") === "-7"}`);

console.log(`-2--5 should equal 3 -    -2--5=${calculate("-2--5")}        ${calculate("-2--5") === "3"}`);
console.log(`--2--5 should equal 7 -   --2--5=${calculate("--2--5")}       ${calculate("--2--5") === "7"}`);
console.log(`-+-2-+5 should equal -3 - -+-2-+5=${calculate("-+-2-+5")}     ${calculate("-+-2-+5") === "-3"}`);

console.log(`-2x2 should equal -4 -    -2x2=${calculate("-2x2")}        ${calculate("-2x2") === "-4"}`);
console.log(`-2/2 should equal -1 -    -2/2=${calculate("-2/2")}        ${calculate("-2/2") === "-1"}`);
console.log(`2x-2 should equal -4 -    2x-2=${calculate("2x-2")}        ${calculate("2x-2") === "-4"}`);
console.log(`-2x-2 should equal 4 -    -2x-2=${calculate("-2x-2")}       ${calculate("-2x-2") === "4"}`);

console.log(`3/-3 should equal -1 -    3/-3=${calculate("3/-3")}       ${calculate("3/-3") === "-1"}`);
console.log(`-3/-3 should equal 1 -    -3/-3=${calculate("-3/-3")}      ${calculate("-3/-3") === "1"}`);
console.log(`3^3 should equal 27 -     3^3=${calculate("3^3")}         ${calculate("3^3") === "27"}`);
console.log(`-3^3 should equal -27 -   -3^3=${calculate("3^3")}        ${calculate("-3^3") === "-27"}`);
console.log(`3^-3 should equal -27 -   3^-3=${calculate("3^-3")}        ${calculate("3^-3") === "-27"}`);


