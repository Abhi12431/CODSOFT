window.onload = function() {
    var input = document.getElementById("inputBox");
    var container = document.getElementById("container");

    container.addEventListener("click", function(e) {
        buttonClick(e.target.id);
    });

    var calc = document.getElementById("Button=");
    calc.addEventListener("click", calculate);

    var C = document.getElementById("ButtonC");
    C.addEventListener("click", erase);

    // Add backspace functionality
    var backspace = document.getElementById("Button%");
    backspace.addEventListener("click", backspaceFunc);

    function buttonClick(buttonId) {
        if((buttonId != "ButtonC") && (buttonId != "Button=") && (buttonId != "Button%")) {
            var button = document.getElementById(buttonId);
            var s = buttonId;
            s = s.replace("Button", "");
            entries(s);
        }
    }

    function entries(s) {
        var currentValue = input.value;
        
        // Prevent multiple operators in a row
        if (isOperator(s) && isOperator(currentValue.slice(-1))) {
            return;
        }
        
        // Prevent operator at the beginning (except minus for negative numbers)
        if (isOperator(s) && currentValue === "" && s !== "-") {
            return;
        }
        
        // Prevent multiple decimal points in the same number
        if (s === ".") {
            var parts = currentValue.split(/[\+\-\*\/]/);
            var lastPart = parts[parts.length - 1];
            if (lastPart.includes(".")) {
                return;
            }
        }
        
        input.value += s;
    }

    function isOperator(char) {
        return ['+', '-', '*', '/', '(', ')'].includes(char);
    }

    function calculate() {
        var expression = input.value.trim();
        
        if (expression === "" || expression === ".") {
            alert("Please Enter a Mathematical Expression");
            return;
        }
        
        // Basic validation for the expression
        if (!isValidExpression(expression)) {
            alert("Invalid Mathematical Expression");
            return;
        }
        
        try {
            var result = eval(expression);
            
            // Check if result is valid
            if (isFinite(result)) {
                // Format the result to avoid too many decimal places
                if (Number.isInteger(result)) {
                    input.value = result;
                } else {
                    input.value = parseFloat(result.toFixed(8));
                }
            } else {
                alert("Invalid Calculation");
                input.value = "";
            }
        } catch (error) {
            alert("Invalid Mathematical Expression");
            input.value = "";
        }
    }

    function isValidExpression(expr) {
        // Basic validation: check for balanced parentheses and valid characters
        var parentheses = 0;
        var validChars = /^[0-9\+\-\*\/\(\)\.\s]+$/;
        
        if (!validChars.test(expr)) {
            return false;
        }
        
        for (var i = 0; i < expr.length; i++) {
            if (expr[i] === '(') {
                parentheses++;
            } else if (expr[i] === ')') {
                parentheses--;
                if (parentheses < 0) {
                    return false;
                }
            }
        }
        
        return parentheses === 0;
    }

    function erase() {
        input.value = "";
    }

    function backspaceFunc() {
        input.value = input.value.slice(0, -1);
    }
};