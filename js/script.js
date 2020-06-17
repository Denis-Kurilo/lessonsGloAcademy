let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let money;
function start(){
  do{
    appData.budget = +prompt('Ваш месячный доход?');
  }while(!isNumber(appData.budget))
};

let appData = {
  income: {}, //Дополнительные доходы
  addIncome: [], //Дополнительные доходы
  expenses: {}, //Дополнительные расходы 
  addExpenses: [], //массив с возможными расходами
  deposit: false,
  mission: 500000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function(){
    let cost;
    for (let i = 0; i < 2; i++){
      let itemOfExpenditure;
      itemOfExpenditure = prompt('Введите обязательную статью расходов?');

      do{
        cost = +prompt('Во сколько это обойдется?');  
      }while(!isNumber(cost));
        appData.expenses[itemOfExpenditure] = cost; 
    }
    console.log(appData.expenses)

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },
  getExpensesMonth: function(){
    let arr = [], num;
    for (let key in appData.expenses){
      num = appData.expenses[key];
      arr.push(num);
    };

    let sum = 0
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
      console.log(sum)
    };
    appData.expensesMonth += sum;
    console.log(`сумму всех обязательных расходов ${appData.expensesMonth}`);
  },

  getAccumulatedMonth: function(){
    return appData.budget - expensesMonth;
  },
  getTargetMonth: function(){
    return Math.ceil(appData.mission / accumulatedMonth); 
  },
  getStatusIncome: function(){
    if(appData.budgetDay >= 1200){
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200){
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay < 600){
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay <= 0){
      return ('Что то пошло не так');
    } 
  }
};
appData.asking();
start();

/*
  function getExpensesMonth(){
    
    let arr = [], num;
    for (let key in appData.expenses){
      num = appData.expenses[key];
      arr.push(num);
    };


    let sum = 0
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
      console.log(sum)
    };

    console.log(sum)
    console.log(arr)
    // appData.expensesMonth.sum;

    // console.log(sum);
  }
getExpensesMonth()*/


// console.log(getExpensesMonth() + 'Во сколько это обойдется?')
let expensesMonth = appData.expensesMonth,
  accumulatedMonth;

// console.log(expensesMonth)

// expensesMonth = appData.asking();
accumulatedMonth = appData.getAccumulatedMonth();


appData.budgetDay = Math.floor(accumulatedMonth / 30);

console.log('Ваш бюджет ', appData.budget);
console.log('Расходы за месяц', expensesMonth);
console.log('Накопления за месяц ', accumulatedMonth);
// console.log(appData.getStatusIncome());

if(appData.getTargetMonth() < 0 ){
  console.log('Цель не будет достигнута ' + appData.getTargetMonth());
 } else {
  console.log('Будет достигнута цель ' + appData.getTargetMonth()); 
 }
    
console.log(expensesMonth + ' Сумма обязательных расходов')
 console.log(appData);