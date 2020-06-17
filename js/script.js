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
  income: {}, 
  addIncome: [], 
  expenses: {}, 
  addExpenses: [], 
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
    console.log(appData.expenses);

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');   
    this.expensesMonth += this.getExpensesMonth();
    console.log(`Сумму всех обязательных расходов ${this.expensesMonth}`);
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
    };
    
    return sum;
  },

  getBudget: function(){
    return appData.budgetMonth = appData.budget - appData.expensesMonth;
    return appData.budgetMonth - appData.budgetDay;
  },
  getTargetMonth: function(){
    return Math.ceil(appData.mission / appData.getBudget()); 
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

appData.budgetDay = Math.floor(appData.getBudget() / 30);

console.log('Расходы за месяц', appData.expensesMonth);
console.log('Ваш бюджет ', appData.budget);
console.log('Накопления за месяц ', appData.getBudget());
console.log(appData.getStatusIncome());
if(appData.getTargetMonth() < 0 ){
  console.log('Цель не будет достигнута ' + appData.getTargetMonth());
 } else {
  console.log('Будет достигнута цель ' + appData.getTargetMonth()); 
 }

console.log('Наша программа включает в себя данные:');
for(let key in appData){
  console.log(`Ключ: ${key} Значение: ${appData[key]} `);
}