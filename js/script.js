let input = document.getElementById('screen'),
  number = document.querySelectorAll('.numbers div'),
  sign = document.querySelectorAll('.signs div'),
  result = document.getElementById('result'),
  clean = document.getElementById('clean'),
  resultShow = false; 

//нажатие кнопок с цифрами
for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {

    //переменные текста на экране и последний символ
    let textOnScreen = input.innerHTML; 
        let lastChar = textOnScreen[textOnScreen.length-1]; //позволяет проводить дальнейшие вычисления после первой операции
    // если результат еще не показан, продолжайте добавлять
    if (resultShow === false) { 
      input.innerHTML += e.target.innerHTML; //отображает экран с введенными цифрами; экран=экран + введенные числа
    } else if (resultShow === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      // если результат уже вычислен и нажимается кнопка равно, то можно продолжить добавление в калькуляторе чисел для следующей операции
      resultShow = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      //если результат уже вычислен и пользователь нажал сброс, то очищается экран и можно начать новую операцию ???
      resultShow = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }

  });
}

//добавление события click в кнопки счетов
for (let i = 0; i < sign.length; i++) {
  sign[i].addEventListener("click", function(e) {

    //переменные текста на экране и последний символ 
    let textOnScreen = input.innerHTML;
    let lastChar = textOnScreen[textOnScreen.length - 1];

    //если последний показанный символ является учетной записью, замените его на тот, по которому щелкнули мышью
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      let newString = textOnScreen.substring(0, textOnScreen.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    } else if (textOnScreen.length == 0) {
      //если первой нажатой клавишей является счет, предлагает сначала ввести число
      alert("Сначала введите число!");
    } else {
      //в противном случае просто добавьте счет, нажав на экран
      input.innerHTML += e.target.innerHTML;
    }

  });
}

//добавление события щелчка по одной и той же кнопке
result.addEventListener("click", function() {

  //редактируемый текст
  let inputString = input.innerHTML;

  //составление списка номеров, которые будут обрабатываться
  let numbers = inputString.split(/\+|\-|\×|\÷/g);

  //составление списка счетов, подлежащих обработке
  let signs = inputString.replace(/[0-9]|\./g, "").split("");

  //выполнение математических заданий по порядку: сначала деление, затем умножение, вычитание и сложение
  let divide = signs.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    signs.splice(divide, 1);
    divide = signs.indexOf("÷");
  }

  let multiply = signs.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    signs.splice(multiply, 1);
    multiply = signs.indexOf("×");
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

  input.innerHTML = numbers[0]; // вывод результата на экран

  resultShow = true; // результат показывается 
});

// добавление события щелчка для кнопки очистить
clean.addEventListener("click", function() {
  input.innerHTML = "";
})


















 