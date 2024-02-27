var expression = ""

var expressionValue = document.createElement("div");
expressionValue.id = "expressionValue";
expressionValue.innerHTML = "0";
calculator.appendChild(expressionValue);

var buttonContainer = document.createElement("div");
buttonContainer.id = "button_container";
buttonContainer.className = "grid-container";
calculator.appendChild(buttonContainer);

var numContainer = document.createElement("div");
numContainer.id = "num_container";
numContainer.className = "grid-container";
buttonContainer.appendChild(numContainer);

var opContainer = document.createElement("div");
opContainer.id = "op_container";
opContainer.className = "grid-container";
buttonContainer.appendChild(opContainer);

function formatNumber(numStr) {
    if (numStr.length <= 15) {
        return numStr;
    }

    var dotIndex = numStr.indexOf('.');
    if (dotIndex !== -1) {
        var decimalPlaces = 15 - (dotIndex + 1);
        decimalPlaces = decimalPlaces < 0 ? 0 : decimalPlaces;
        var num = Number(numStr);
        return Number(num.toFixed(decimalPlaces));
    } else {
        return NaN;
    }
}

function updateExpression(expression) {
    document.getElementById('expressionValue').innerText = formatNumber(expression);
}

// 定义数字
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0];

// 添加数字按钮
numbers.forEach(function(num) {
    var button = document.createElement("button");
    button.id = "button_" + num;
    button.innerHTML = num;
    button.className = "button num";
    button.addEventListener("click", function() {
        expression += num;
        updateExpression(expression);
    });
    numContainer.appendChild(button);
});

// 定义操作符
var operators = ['+', '-', '*', '/'];

// 添加操作符按钮
operators.forEach(function(op) {
    var button = document.createElement("button");
    button.id = "button_" + op;
    button.innerHTML = op;
    button.className = "button op";
    button.addEventListener("click", function() {
        expression += op;
        updateExpression(expression);
    });
    opContainer.appendChild(button);
});

// 添加清除按钮
var button = document.createElement("button");
button.id = "button_clear";
button.innerHTML = "C";
button.className = "button clear";
button.addEventListener("click", function() {
    expression = "";
    updateExpression(expression+0);
});
numContainer.appendChild(button);

// 添加等号按钮
var button = document.createElement("button");
button.id = "button_eq";
button.innerHTML = "=";
button.className = "button eq";
button.addEventListener("click", function() {
    expression = eval(expression).toString();
    updateExpression(expression);
});
calculator.appendChild(button);