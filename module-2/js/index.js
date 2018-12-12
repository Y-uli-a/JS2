'use strict'
let input;
let numbers = [];
let total = 0;
do {
  input = prompt ("Введите число");
  if (input === ' ' || input ==='' || isNaN(Number(input))) {
    alert ('Было введено не число, попробуйте еще раз')
  }
  else if (input !== null) {
  numbers.push(Number(input))
  }
}
while (input !== null);
console.log (numbers)

if (numbers.length > 0) {
  for (let number of numbers) {
    total += number;
  }
}

alert (`Общая сумма чисел равна : ${total}`)