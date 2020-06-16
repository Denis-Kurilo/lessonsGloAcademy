function randomInteger(min, max) {
    return function(){
       return Math.floor(Math.random() * (max - min)) + 1;

    }  
};
let userRandom = randomInteger(1,100);
let userRun = userRandom();
console.log(userRandom())

function guessNum() {
    let num;
    num = +prompt('Угадайте число от 1 до 100');

     if (num == userRun) {
        alert('вы угадали! ');
        window.location.reload();
     } else if (num > userRun && num != '') {
        alert('Вы ввели число больше!' );
        guessNum();
     }else if (num < userRun && num != '') {
        alert('Вы ввели число меньше!');
        guessNum();
     } else if (isNaN(parseFloat(num) && isFinite(num))) {
        alert('Введите число');
        guessNum();
     }else{
       alert('Завершить игру')
     }
}
guessNum();