// `use strict`;
let start = document.getElementById('start'),
  btnPlus = document.getElementsByTagName('button')[0],
  btnPlus2 = document.getElementsByTagName('button')[1],
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  depositСheck = document.querySelector('#deposit-check'),
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0], 
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],  
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],  
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],  
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],  
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  expensesTitle = document.querySelector('.expenses-title'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpenses = document.querySelector('.additional_expenses'),
  periodSelect = document.querySelector('.period-select'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  incomeItems = document.querySelectorAll('.income-items'),
  periodAmount = document.querySelector('.period-amount');

let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
  income: {}, 
  incomeMonth: 0,
  addIncome: [], 
  expenses: {}, 
  addExpenses: [], 
  deposit: false,
  percentDeposit: 0, 
  moneyDeposit: 0,
  period: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function(){
    appData.budget = +salaryAmount.value;
    appData.getPeriod();
    appData.getExpenses();
    appData.dinamikCalkPeriod();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.showResult();
  },
  showResult: function(){
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();
    // periodSelect.value = appData.getPeriod();
    periodSelect.addEventListener('input', appData.dinamikCalkPeriod);
  },
  addExpensesBlock: function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlus2);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
      btnPlus2.style.display = 'none';
    }

  },
  addIncomeBlock: function(){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
      btnPlus.style.display = 'none';
    }
  },
  getIncome: function(){
    incomeItems.forEach(function(item){
      let incomeTitle = item.querySelector('.income-title').value;
      let incomeAmount = item.querySelector('.income-amount').value;

      if( incomeTitle !== '' && incomeAmount !== ''){
        appData.income[incomeTitle] = incomeAmount;
      }
    });

    for(let key in appData.income){
      appData.incomeMonth += +appData.income[key];
    }
  },
  getExpenses: function(){
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;

      if(itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = cashExpenses;
      }
    })
  },
  getAddExpenses: function(){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim(item);
      if(item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function(){           //Возможный доход
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        appData.addIncome.push(itemValue);
      }
    })
  },
  getExpensesMonth: function(){
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getBudget: function(){
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function(){
    return targetAmount.value / appData.budgetMonth;
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
      let defPercent = appData.percentDeposit = prompt('Какой годовой процент?', '10');
      appData.percentDeposit = appData.validateNumber(this.percentDeposit, 'Какой годовой процент?');

      let defMoney = appData.moneyDeposit = prompt('Какой сумма заложена?', '10000');
      appData.moneyDeposit = appData.validateNumber(this.moneyDeposit, 'Какой сумма заложена?');
    }
  },
 calcPeriod: function(){
    return appData.budgetMonth * periodSelect.value;
  },
   getPeriod: function(){
    appData.period = +event.target.value;
    periodAmount.innerHTML = periodSelect.value;
  },
  dinamikCalkPeriod: function(){
    // let = incomePeriodVal = salaryAmount.value;
    incomePeriodValue.value = appData.period * (appData.budget - appData.expensesMonth);
  },
  validateNumber: function(name, text){
     while (!isNumber(name)) {
      if(isNumber(name)){
      return name;
      }else{
        alert("Вы ввели не число!!!");
        name = prompt(text);
      }  
    } 
    return name;
  }
};

let salaryAmountVal = salaryAmount.addEventListener('input', function(){
  if(salaryAmount.value.length > 0 && isNumber(salaryAmount.value)){
    start.removeAttribute('disabled');
    start.addEventListener('click', appData.start);
    start.style.backgroundColor = 'auto';
  }else if(salaryAmount.value.length == 0){
    start.setAttribute('disabled','disabled')
    start.style.backgroundColor = '#73757C';
    start.style.cursor = 'default';
  }
})

btnPlus.addEventListener('click', appData.addIncomeBlock);
btnPlus2.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', appData.getPeriod);
/*if(appData.getTargetMonth() < 0 ){
  console.log('Цель не будет достигнута ' + appData.getTargetMonth());
 } else {
  console.log('Будет достигнута цель ' + appData.getTargetMonth()); 
 }
*/


/*console.log('Ваш бюджет ', appData.budget);
console.log(appData.addExpenses + ' - Возможные рассходы');
console.log(appData.deposit + ' - Есть ли у вас депозит в банке?')
console.log(`Сумму всех обязательных расходов ${appData.expensesMonth}`);
console.log('Накопления за месяц ', appData.getBudget());
console.log(typeof appData.strAddExpenses);
console.log(appData.getStatusIncome());*/

console.log(appData);



