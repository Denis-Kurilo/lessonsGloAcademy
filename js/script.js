let number,
  count = 10;

function randomInteger(min, max) {
    return  Math.floor(Math.random() * (max - min)) + 1 
    };
number = randomInteger(1,100);

function guessNum() {
     let num;

// console.log(number)
     num = +prompt('Угадайте число от 1 до 100');
     if(count == 1) {
          return;
     }
     count--;

     if (num == number) {
        alert('вы угадали! ');
     } else if (num > number && num != '') {
        alert('Вы ввели число больше! Осталось попыток: ' + count);
        guessNum();
     }else if (num < number && num != '') {
        alert('Вы ввели число меньше! Осталось попыток: ' + count);
        guessNum();
     } else if (isNaN(parseFloat(num) && isFinite(num))) {
        alert('Введите число');
        guessNum();
     }else{
       alert('Завершить игру')
     }
}
guessNum();