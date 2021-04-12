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

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const operators = ["+", "-", "x", "/"];
const dmOperators = ["/", "x"];
const asOperators = ["+", "-"]

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

//Logic
const addValue = function(value) {
    //console.log(`Execute number ${value}...`);
    //console.log(`Appending ${value} to ${stringToProcess}...`);
    stringToProcess += value;
    //console.log(`stringToProcess is now: ${stringToProcess}...`);
    display.innerHTML = stringToProcess;
    return
};

const reverseString = function(str) {
    let newString = "";
    for (let i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString
};
const cleanString = function() {
    //console.log("Checking if string starts with --")
    if ((stringToProcess[0] === "-" && stringToProcess[1] === "-") || (stringToProcess[0] === "-" && stringToProcess[1] === "0")) {
        console.log("String is dirty! Cleaning...")
        stringToProcess = stringToProcess.slice(1);
    }
};
const processConsecutiveSumOperators = function() {
    console.log("Processing string for consecutive sum operators...")
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
    console.log(`stringToProcess post processing for consecutive sum operators: ${stringToProcess}`)
};

const retrievePreviousValue = function(index) {
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
const retrieveNextValue = function(index) {
    let nextValue = "";
    for (let i = index + 1; i < stringToProcess.length; i++) {
        if (operators.includes(stringToProcess[i])) {
            break
        };
        nextValue += stringToProcess[i];
    };
    return nextValue
};

const retrieveFirstSpliceIndex = function(index) {
    let firstSpliceIndex = 0;
    for (let i = index - 1; i >= 0; i--) {
        if (operators.includes(stringToProcess[i])) {
            firstSpliceIndex = i + 1;
            break
        };
    };
    return firstSpliceIndex
}
const retrieveSecondSpliceIndex = function(index) {
    let secondSpliceIndex;
    for (let i = index + 1; i < stringToProcess.length; i++) {
        if (operators.includes(stringToProcess[i])) {
            secondSpliceIndex = i;
            break
        };
    };
    return secondSpliceIndex
};

const divisionAndMultiplicationPass = function() {
    let index = 0;

    while (index < stringToProcess.length) {
        //console.log(`Processing index: ${index}`);
        if (stringToProcess[index] === "/") {
            //Retrieve the two values and make the calculation
            let valueOne = retrievePreviousValue(index);
            let valueTwo = retrieveNextValue(index);
            let firstSpliceIndex = retrieveFirstSpliceIndex(index);
            let secondSpliceIndex = retrieveSecondSpliceIndex(index);
            let dividedValue = divide(valueOne, valueTwo);

            //Modify string and place index at the correct place
            let dividedValueString = dividedValue.toString();  //Get the value to replace the calculation in the stringToProcess
            let firstStringPart = stringToProcess.slice(0, firstSpliceIndex);
            let secondStringPart = '';
            if (secondSpliceIndex) {        //This ensures that it doesn't look for another operator afterwards if there isn't one
                secondStringPart = stringToProcess.slice(secondSpliceIndex);
            };

            let newStringToProcess = firstStringPart + dividedValueString + secondStringPart;
            stringToProcess = newStringToProcess;
            index = (firstSpliceIndex -1) + dividedValueString.length + 1;  //Calculate where the index where the stringToProcess should be analyzed post calculation
            //console.log(`Index on the newStringToProcess to start again on = ${index}`)
        } else if (stringToProcess[index] === "x") {
            //Retrieve the two values and make the calculation
            let valueOne = retrievePreviousValue(index);
            let valueTwo = retrieveNextValue(index);
            let firstSpliceIndex = retrieveFirstSpliceIndex(index);
            let secondSpliceIndex = retrieveSecondSpliceIndex(index);
            let multipliedValue = multiply(valueOne, valueTwo);

            //Modify string and place index at the correct place
            let multipliedValueString = multipliedValue.toString();  //Get the value to replace the calculation in the stringToProcess
            let firstStringPart = stringToProcess.slice(0, firstSpliceIndex);
            let secondStringPart = '';
            if (secondSpliceIndex) {        //This ensures that it doesn't look for another operator afterwards if there isn't one
                secondStringPart = stringToProcess.slice(secondSpliceIndex);
            };

            let newStringToProcess = firstStringPart + multipliedValueString + secondStringPart;
            stringToProcess = newStringToProcess;
            index = (firstSpliceIndex -1) + multipliedValueString.length + 1;  //Calculate where the index where the stringToProcess should be analyzed post calculation
            //console.log(`Index on the newStringToProcess to start again on = ${index}`)
        } else {
            index++
        }
    }
    //cleanString();
    console.log(`Finished division and multiplication pass. stringToProcess: ${stringToProcess}`);
};
const additionAndSubtractionPass = function() {
    let sum = 0;
    let positiveStrings = [];
    let negativeStrings = [];

    if (operators.includes(stringToProcess[0])) {                       //Fix stringToProcess so that first value is correctly interpreted
        stringToProcess = "0" + stringToProcess
    } else {
        stringToProcess = "0+" + stringToProcess
    };

    for (let index = 0; index < stringToProcess.length; index++) {      //Extract positive and negative strings
        if (stringToProcess[index] === "+") {
            positiveStrings.push(retrieveNextValue(index))
        };
        if (stringToProcess[index] === "-") {
            negativeStrings.push(retrieveNextValue(index))
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

    let finalString = sum.toString();
    stringToProcess = finalString;
    console.log(`Finished addition and subtraction pass. stringToProcess: ${stringToProcess}`);
}


const checkSyntax = function() {
    console.log("________________________________________")
    console.log(`Processing ${stringToProcess}...`);
    if (stringToProcess[0] === "+" || stringToProcess[0] === "-") {             //Append 0 to start of string for processing strings starting with + or -
        stringToProcess = "0" + stringToProcess;                                //Is this necessary? Already do this elsewhere - may remove later
    };
    if (dmOperators.includes(stringToProcess[0]) || operators.includes(stringToProcess[(stringToProcess.length - 1)])) { //Check if starts or ends with 
        console.log("Syntax Error - stringToProcess begins or ends with an inappropriate operator");                     //inappropriate operators
        stringToProcess = "Syntax Error!";
    };
    for (let i = 0; i < stringToProcess.length; i++) {
        if (dmOperators.includes(stringToProcess[i]) && dmOperators.includes(stringToProcess[(i + 1)])) {      //Check for consecutive x or / operators
            console.log("Syntax Error - stringToProcess contains two consecutive x or / operators")
            stringToProcess = "Syntax Error!";
        }
    }
    processConsecutiveSumOperators();                  //Process string to be able to handle multiple consecutive plus or minus operators
}

const calculateBodmas = function() {
    divisionAndMultiplicationPass();
    additionAndSubtractionPass();
};
const calculate = function() {
    checkSyntax();
    if (stringToProcess !== "Syntax Error!") {
        calculateBodmas();
    }
    display.innerHTML = stringToProcess
};

const clearDisplay = function() {
    stringToProcess = '';
    display.innerHTML = '';
};

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

decimal.addEventListener('click', function() {addValue(".")});

plus.addEventListener('click', function() {addValue("+")});
minus.addEventListener('click', function() {addValue("-")});
times.addEventListener('click', function() {addValue("x")});
slash.addEventListener('click', function() {addValue("/")});

equals.addEventListener('click', calculate);
clear.addEventListener('click', clearDisplay);



/* Legacy Code kept in stasis

const oldAdditionAndSubtractionPass = function() {
    let index = 0;

    while (index < stringToProcess.length) {
        //console.log(`Processing index: ${index}`);
        if (stringToProcess[index] === "+") {
            //Retrieve the two values and make the calculation
            let valueOne = retrievePreviousValue(index);
            let valueTwo = retrieveNextValue(index);
            let firstSpliceIndex = retrieveFirstSpliceIndex(index);
            let secondSpliceIndex = retrieveSecondSpliceIndex(index);
            let addedValue = add(valueOne, valueTwo);
            console.log(`Splice indexes: ${firstSpliceIndex} ${secondSpliceIndex}`);
            console.log(`valueOne + valueTwo: ${valueOne} + ${valueTwo}`);
            console.log(`addedValue: ${addedValue}`)

            //Modify string and place index at the correct place
            let addedValueString = addedValue.toString();  //Get the value to replace the calculation in the stringToProcess
            let firstStringPart = stringToProcess.slice(0, firstSpliceIndex);
            let secondStringPart = '';
            if (secondSpliceIndex) {        //This ensures that it doesn't look for another operator afterwards if there isn't one
                secondStringPart = stringToProcess.slice(secondSpliceIndex);
            };

            let newStringToProcess = firstStringPart + addedValueString + secondStringPart;
            stringToProcess = newStringToProcess;
            index = (firstSpliceIndex -1) + addedValueString.length + 1;  //Calculate where the index where the stringToProcess should be analyzed post calculation
            //console.log(`Index on the newStringToProcess to start again on = ${index}`)
        } else if (stringToProcess[index] === "-" && index !== 0) {
            //Retrieve the two values and make the calculation
            let valueOne = retrievePreviousValue(index);
            let valueTwo = retrieveNextValue(index);
            let firstSpliceIndex = retrieveFirstSpliceIndex(index);
            let secondSpliceIndex = retrieveSecondSpliceIndex(index);
            let subtractedValue = subtract(valueOne, valueTwo);
            console.log(`Splice indexes: ${firstSpliceIndex} ${secondSpliceIndex}`);
            console.log(`valueOne - valueTwo: ${valueOne} - ${valueTwo}`);
            console.log(`subtractedValue: ${subtractedValue}`);

            //Modify string and place index at the correct place
            let subtractedValueString = subtractedValue.toString();  //Get the value to replace the calculation in the stringToProcess
            let firstStringPart = stringToProcess.slice(0, firstSpliceIndex);
            let secondStringPart = '';
            if (secondSpliceIndex) {        //This ensures that it doesn't look for another operator afterwards if there isn't one
                secondStringPart = stringToProcess.slice(secondSpliceIndex);
            };

            let newStringToProcess = firstStringPart + subtractedValueString + secondStringPart;
            stringToProcess = newStringToProcess;
            index = (firstSpliceIndex -1) + subtractedValueString.length + 1;  //Calculate where the index where the stringToProcess should be analyzed post calculation
            //console.log(`Index on the newStringToProcess to start again on = ${index}`)
        } else if (stringToProcess[index] === "-" && index === 0) {
            index++ //Delete if this branch of logic is not needed
        } else {
            index++
        }
    }
    cleanString();
    console.log(`Finished addition and subtraction pass. stringToProcess: ${stringToProcess}`);
};
*/