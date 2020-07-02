// `use strict`;
let start = document.getElementById('start'),
  cancel = document.getElementById('cancel'),
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

const AppData = function() {
  this.income = {}; 
  this.incomeMonth = 0;
  this.addIncome = []; 
  this.expenses = {}; 
  this.addExpenses = []; 
  this.deposit = false;
  this.percentDeposit = 0; 
  this.moneyDeposit = 0;
  this.period = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};

AppData.prototype.start = function(){
  // console.log(this)
  this.budget = +salaryAmount.value;
  this.getPeriod();
  this.dinamikCalkPeriod();
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();
  this.showResult();
  this.noActivClickBtnStart();
  this.reset();
};

AppData.prototype.showResult = function(){
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incomePeriodValue.value = this.calcPeriod();
  periodSelect.addEventListener('input', this.dinamikCalkPeriod);
};

AppData.prototype.addExpensesBlock = function(){
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlus2);
  expensesItems = document.querySelectorAll('.expenses-items');
  if(expensesItems.length === 3){
    btnPlus2.style.display = 'none';
  }
};

AppData.prototype.addIncomeBlock = function(){
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlus);
  incomeItems = document.querySelectorAll('.income-items');
  if(incomeItems.length === 3){
    btnPlus.style.display = 'none';
  }
};

AppData.prototype.getIncome = function(){
  incomeItems.forEach(function(item){
    let incomeTitle = item.querySelector('.income-title').value;
    let incomeAmount = item.querySelector('.income-amount').value;

    if( incomeTitle !== '' && incomeAmount !== ''){
      this.income[incomeTitle] = incomeAmount;
    }
  }, this);

  for(let key in this.income){
    this.incomeMonth += +this.income[key];
  }
};

AppData.prototype.getExpenses = function(){
  expensesItems.forEach(function(item){
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;

    if(itemExpenses !== '' && cashExpenses !== ''){
      this.expenses[itemExpenses] = cashExpenses;
    }
  }, this)
};

AppData.prototype.getAddExpenses = function(){
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach(function(item){
    item = item.trim(item);
    if(item !== ''){
      this.addExpenses.push(item);
    }
  }, this);
};

AppData.prototype.getAddIncome = function(){          
  additionalIncomeItem.forEach(function(item){
    let itemValueArr = item.value.trim();
    if(itemValueArr !== ''){
      this.addIncome.push(itemValueArr);
    }
  }, this)
};

AppData.prototype.getExpensesMonth = function(){
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
};

AppData.prototype.getBudget = function(){
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function(){
  return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function(){
  if(this.budgetDay >= 1200){
    return ('У вас высокий уровень дохода');
  } else if (this.budgetDay >= 600 && this.budgetDay < 1200){
    return ('У вас средний уровень дохода');
  } else if (this.budgetDay < 600){
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else if (this.budgetDay <= 0){
    return ('Что то пошло не так');
  } 
};

AppData.prototype.getInfoDeposit = function(){
  if(this.deposit){
    let defPercent = this.percentDeposit = prompt('Какой годовой процент?', '10');
    this.percentDeposit = this.validateNumber(this.percentDeposit, 'Какой годовой процент?');

    let defMoney = this.moneyDeposit = prompt('Какой сумма заложена?', '10000');
    this.moneyDeposit = this.validateNumber(this.moneyDeposit, 'Какой сумма заложена?');
  }
};

AppData.prototype.calcPeriod = function(){
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.getPeriod = function(){
  this.period = periodSelect.value;
  periodAmount.innerHTML = periodSelect.value;
};

AppData.prototype.dinamikCalkPeriod = function(){
  let incomePeriodVal = periodSelect.value * budgetMonthValue.value;
  incomePeriodValue.value = incomePeriodVal;
};

AppData.prototype.validateNumber = function(name, text){
  while (!isNumber(name)) {
    if(isNumber(name)){
    return name;
    }else{
      alert("Вы ввели не число!!!");
      name = prompt(text);
    }  
  } 
  return name;
};

AppData.prototype.noActivClickBtnStart = function(){
  start.disabled = true;
  let input = document.querySelectorAll('input');
  input.forEach(function(item){
    if(start.disabled == true){
      item.disabled = true;
      periodSelect.disabled = false;
    }
  });
  start.style.display = "none";
};

AppData.prototype.reset = function(){
  cancel.style.display = "block";
  cancel.addEventListener('click', function(){
    depositСheck.checked = false;

    let objCopy = Object.assign({}, appData);
    objCopy = appData;
    console.log(objCopy)
    objCopy.budget = 0;
    objCopy.budgetDay = 0;
    objCopy.budgetMonth = 0;
    objCopy.incomeMonth = 0;
    objCopy.expensesMonth = 0;
    objCopy.period = 1;
    objCopy.income = {};
    objCopy.addExpenses = [];
    objCopy.addIncome = [];
    objCopy.expenses = {};

    start.disabled = true;
    let input = document.querySelectorAll('input');
      input.forEach(function(item){
        item.value = '';
        item.disabled = false;
      });
      periodSelect.value = 1;
      periodAmount.innerHTML = 1;
      start.style.display = "block";
      cancel.style.display = "none";
    });
};

AppData.prototype.eventListeners = function(){
  let salaryAmountVal = salaryAmount.addEventListener('input', function(){
    if(isNumber(salaryAmount.value)){
      start.addEventListener('click', startCalc);
      if(salaryAmount.value.length == 0){
          start.disabled = true;
        }else{
          start.disabled = false;
        }
    }
  });

  cancel.addEventListener('click', this.changeBtn);
  btnPlus.addEventListener('click', this.addIncomeBlock);
  btnPlus2.addEventListener('click', this.addExpensesBlock);
  periodSelect.addEventListener('input', this.getPeriod);

  let startCalc = appData.start.bind(appData);
  let changeBtn = appData.start.bind(appData);
};

const appData = new AppData();
console.log(appData);
appData.eventListeners();


// periodSelect.addEventListener('input', appData.dinamikCalkPeriod);
/*if(appData.getTargetMonth() < 0 ){
  console.log('Цель не будет достигнута ' + appData.getTargetMonth());
 } else {
  console.log('Будет достигнута цель ' + appData.getTargetMonth()); 
 }
*/

