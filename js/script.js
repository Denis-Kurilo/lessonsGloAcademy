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
  income: {}, 
  addIncome: [], 
  expenses: {}, 
  addExpenses: [], 
  deposit: false,
  percentDeposit: 0, 
  moneyDeposit: 0, //Сколько денег заложил
  mission: 500000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function(){

    if(confirm('Есть у вас дополнительный заработок?')){
      let itemIncome = +prompt('Какой у вас дополнительный заработок', 'Такси');
      let cashIncome = +prompt('Сколько в месяц вы на этом зарабатываете', 10000);
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    
    appData.deposit = confirm('Есть ли у вас депозит в банке?'); 

    let cost;
    for (let i = 0; i < 2; i++){
      let itemOfExpenditure;
      itemOfExpenditure = prompt('Введите обязательную статью расходов?');

      do{
        cost = +prompt('Во сколько это обойдется?');  
      }while(!isNumber(cost));
        appData.expenses[itemOfExpenditure] = cost; 
    }

    this.expensesMonth += this.getExpensesMonth();
    this.budgetMonth += this.getBudget();
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
    return appData.budget - appData.expensesMonth;
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
  },
  getInfoDeposit: function(){
    if(appData.deposit){
      appData.percentDeposit = prompt('Какой годовой процент?', '10');
      appData.moneyDeposit = prompt('Какой сумма заложена?', '10000');
    }
  },
  calcSavedMoney: function(){
    return appData.budgetMonth * appData.period;
  },
  checkOnValidation: function(){
    if(typeof == !'string' ){
      console.log()
    }
  }
};
appData.asking();
appData.budgetDay = Math.floor(appData.getBudget() / 30);

console.log('Ваш бюджет ', appData.budget);
console.log(appData.addExpenses + ' - Возможные рассходы');
console.log(appData.deposit + ' - Есть ли у вас депозит в банке?')
console.log(`Сумму всех обязательных расходов ${appData.expensesMonth}`);
console.log('Накопления за месяц ', appData.getBudget());
console.log(appData.getStatusIncome());
if(appData.getTargetMonth() < 0 ){
  console.log('Цель не будет достигнута ' + appData.getTargetMonth());
 } else {
  console.log('Будет достигнута цель ' + appData.getTargetMonth()); 
 }
console.log(appData);
console.log('Наша программа включает в себя данные:');
for(let key in appData){
  console.log(`Ключ: ${key} Значение: ${appData[key]} `);
}

appData.getInfoDeposit();
console.log(appData.moneyDeposit, appData.percentDeposit, appData.calcSavedMoney());