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

    let getExpensesMonth = function(){
      let sum = 0;
      let cost;
      do{
        cost = +prompt('Во сколько это обойдется?');  
      }while(!isNumber(cost));
      sum += cost;
    }
    


    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },
/*  getExpensesMonth: function(){
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
  },*/

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

// console.log(getExpensesMonth() + 'Во сколько это обойдется?')
let expenses = [],
  expensesMonth,
  accumulatedMonth;

console.log(expensesMonth)

// expensesMonth = appData.asking();
accumulatedMonth = appData.getAccumulatedMonth();


appData.budgetDay = Math.floor(accumulatedMonth / 30);

console.log('Ваш бюджет ', appData.budget);
console.log('Расходы за месяц', expensesMonth);
console.log('Накопления за месяц ', accumulatedMonth);
console.log(appData.getStatusIncome());

if(appData.getTargetMonth() < 0 ){
  console.log('Цель не будет достигнута ' + appData.getTargetMonth());
 } else {
  console.log('Будет достигнута цель ' + appData.getTargetMonth()); 
 }