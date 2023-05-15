class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement  = currentOperandTextElement;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        }
        else {
            this.previousOperandTextElement.innerText = '';
        }
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        switch (this.operation){
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break
            case "*":
                computation = prev * current;
                break;
            case "/":
                computation = prev / current;
                break;
            default:
                console.log("Unknown operation");
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    chooseOperation(button) {
        this.operation = button;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
}

const numberButtons = document.querySelectorAll('.button-number');
const operationButtons = document.querySelectorAll('.button-operation');
const deleteButton = document.querySelector('#delete');
const allClearButton = document.querySelector('#all-clear');
const equalsButton = document.querySelector('#equals');

const previousOperandTextElement = document.querySelector('.result2nd');
const currentOperandTextElement = document.querySelector('.result');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log (button.innerText);
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log (button.innerText);
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

allClearButton.addEventListener('click', button => {
    console.log(button.innerText);
    calculator.clear();
    calculator.updateDisplay();
});
deleteButton.addEventListener('click', button => {
    console.log(button.innerText);
    calculator.delete();
    calculator.updateDisplay();
});
equalsButton.addEventListener('click', button => {
    console.log(button.innerText);
    calculator.compute();
    calculator.updateDisplay();
});

