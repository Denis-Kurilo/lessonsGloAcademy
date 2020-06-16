const game = function(){
    let min = 0;
    let max = 10

    let rundomNum = Math.floor(Math.random() * (max - min)) + 1;
    // console.log(rundomNum)
    
    return function guessNum() {
        let num = +prompt('Угадайте число от 1 до 100');
         if (num == rundomNum) {
            alert('вы угадали! ');
            window.location.reload();
         } else if (num > rundomNum && num != '') {
            alert('Вы ввели число больше!' );
            guessNum();
         }else if (num < rundomNum && num != '') {
            alert('Вы ввели число меньше!');
            guessNum();
         } else if (isNaN(parseFloat(num) && isFinite(num))) {
            alert('Введите число');
            guessNum();
         }else{
           alert('Завершить игру')
         }
        }
         return guessNum();
    }
let startGame = game();
startGame();
