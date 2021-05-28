let input = document.getElementById('screen'),
number = document.querySelectorAll('.numbers div'),
sign = document.querySelectorAll('.signs div'),
result = document.getElementById('result'),
clean = document.getElementById('clean'),
resultShow = false; 


 // запуск цикла нажатия кнопок с цифрами
 for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {
    let textOnScreen = input.innerHTML; 
    let lastChar = textOnScreen[textOnScreen.length-1];

     if (resultShow === false) { 
      input.innerHTML += e.target.innerHTML;

     } else if (resultShow === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      // если результат уже вычислен и нажимается кнопка равно, то можно продолжить добавление чисел для следующей операции
      resultShow = false;
      input.innerHTML += e.target.innerHTML;
     }
       else { // результат уже вычислен и нажали кнопку С, то экран очищается и можно заново вводить данные
      resultShow = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }
  });
}

//добавление события click в кнопки знаков
 for (let i = 0; i < sign.length; i++) {
  sign[i].addEventListener("click", function(e) {
    let textOnScreen = input.innerHTML;
    let lastChar = textOnScreen[textOnScreen.length - 1]; 

    //замена арифмитического знака по клику мышки на новый выбранный знак
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      let newString = textOnScreen.substring(0, textOnScreen.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    }  else 
     if (textOnScreen.length == 0) {
      alert("Сначала введите число!");
    }  else {
      input.innerHTML += e.target.innerHTML;
    }
  });
} 

result.addEventListener("click", function() {
  let inputString = input.innerHTML;
  let numbers = inputString.split(/\+|\-|\×|\÷/g);
  let signs = inputString.replace(/[0-9]|\./g, "").split("");

   //выполнение вычислений в арифметическом порядке
   let multiply = signs.indexOf("×");
   while (multiply != -1) {
     numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
     signs.splice(multiply, 1);
     multiply = signs.indexOf("×");
   }

   let divide = signs.indexOf("÷"); 
   while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    signs.splice(divide, 1);
    divide = signs.indexOf("÷");
  }

  let subtract = signs.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    signs.splice(subtract, 1);
    subtract = signs.indexOf("-");
  }
  
  let add = signs.indexOf("+");
  while (add != -1) {
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    signs.splice(add, 1);
    add = signs.indexOf("+");
  }

  input.innerHTML = numbers[0];
  resultShow = true; 
});

// добавление события щелчка для кнопки очистить
clean.addEventListener("click", function() {
  input.innerHTML = "";
})
