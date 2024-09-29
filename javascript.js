let currentValue = '';
let previousValue = '';
let operator = '';
let resultValue = '';
let shouldResetScreen = false;

const screen = document.querySelector("#screen");
const keys = document.querySelector(".calculator-keys");

keys.addEventListener('click', function (e) {
    const key = e.target;
    const action = key.value;

    if (!key.matches('button')) return;

    if (!key.classList.contains('operator') && !key.classList.contains('equal-sign') && !key.classList.contains('all-clear')) {
        if (shouldResetScreen) {
            currentValue = action;
            shouldResetScreen = false;
        } else {
            currentValue += action;
        }
        screen.value = currentValue;
    }

    else if (key.classList.contains('operator')) {
        if (currentValue === '') return;

        if (operator) {
            resultValue = eval(previousValue + operator + currentValue);
            screen.value = previousValue + action;
            previousValue = resultValue;
        } else {
            previousValue = currentValue;
            screen.value += action;
        }
        operator = action;
        currentValue = '';
    }

    else if (key.classList.contains('equal-sign')) {
        if (!operator || currentValue === '') return;
        try {
            resultValue = eval(previousValue + operator + currentValue);
            screen.value = resultValue;
            operator = '';
            previousValue = '';
            currentValue = resultValue;
            shouldResetScreen = true;
        } catch (error) {
            screen.value = 'Error';
        }
    }

    else if (key.classList.contains('all-clear')) {
        currentValue = '';
        previousValue = '';
        operator = '';
        resultValue = '';
        screen.value = '';
    }
});
