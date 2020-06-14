let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let money;
function start(){
  do{
    money = +prompt('Ваш месячный доход?');
  }while(!isNumber(money))
};
start();

let appData = {
  income: {}, //Дополнительные доходы
  addIncome: [], //Дополнительные доходы
  expenses: {}, //Дополнительные расходы 
  addExpenses: [], //массив с возможными расходами
  deposit: false,
  mission: 500000,
  period: 3,
  budget: money,
  asking: function(){
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },
  getExpensesMonth: function(){
    let sum = 0;
    let cost;
    for (let i = 0; i < 2; i++){
      expenses[i] = prompt('Введите обязательную статью расходов?');
      do{
        cost = +prompt('Во сколько это обойдется?');  
      }while(!isNumber(cost));
      sum += cost;
    }
    console.log(expenses);
    return sum;
  },
  getAccumulatedMonth: function(){
    return money - expensesAmount;
  },
  getTargetMonth: function(){
    return Math.ceil(appData.mission / accumulatedMonth); 
  },
  getStatusIncome: function(){
    if(budgetDay >= 1200){
      return ('У вас высокий уровень дохода');
    } else if (budgetDay >= 600 && budgetDay < 1200){
      return ('У вас средний уровень дохода');
    } else if (budgetDay < 600){
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (budgetDay <= 0){
      return ('Что то пошло не так');
    } 
  }
};

let expenses = [],
  expensesAmount,
  accumulatedMonth;

/*function showTypeOf(data){
  console.log(data, typeof(data))
};*/

/*function getStatusIncome(){
  if(budgetDay >= 1200){
    return ('У вас высокий уровень дохода');
  } else if (budgetDay >= 600 && budgetDay < 1200){
    return ('У вас средний уровень дохода');
  } else if (budgetDay < 600){
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else if (budgetDay <= 0){
    return ('Что то пошло не так');
  } 
}*/

/*function getExpensesMonth(){
  let sum = 0;
  let cost;
  for (let i = 0; i < 2; i++){
    expenses[i] = prompt('Введите обязательную статью расходов?');
    do{
      cost = +prompt('Во сколько это обойдется?');  
    }while(!isNumber(cost));
    sum += cost;
  }
  console.log(expenses);
  return sum;
};*/
expensesAmount = appData.getExpensesMonth();

/*function getAccumulatedMonth() {
  return money - expensesAmount;
}*/
accumulatedMonth = appData.getAccumulatedMonth();
budgetDay = Math.floor(accumulatedMonth / 30);

/*function getTargetMonth(){
   return Math.ceil(appData.mission / accumulatedMonth);   
}*/

/*showTypeOf(money);
showTypeOf(appData.income);
showTypeOf(appData.deposit);*/


console.log('Расходы за месяц', expensesAmount);
console.log('Накопления за месяц ', accumulatedMonth);
console.log(appData.getStatusIncome());

if(appData.getTargetMonth() < 0 ){
  console.log('Цель не будет достигнута ' + appData.getTargetMonth());
 } else {
  console.log('Будет достигнута цель ' + appData.getTargetMonth()); 
 }