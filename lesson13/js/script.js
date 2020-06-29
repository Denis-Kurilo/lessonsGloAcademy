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
    console.log(this)
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
    this.changeBtn();
  },
  showResult: function(){
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', this.dinamikCalkPeriod);
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
        this.income[incomeTitle] = incomeAmount;
      }
    }, this);

    for(let key in this.income){
      this.incomeMonth += +this.income[key];
    }
  },
  getExpenses: function(){
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;

      if(itemExpenses !== '' && cashExpenses !== ''){
        this.expenses[itemExpenses] = cashExpenses;
      }
    }, this)
  },
  getAddExpenses: function(){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim(item);
      if(item !== ''){
        this.addExpenses.push(item);
      }
    }, this);
  },
  getAddIncome: function(){           //Возможный доход
    additionalIncomeItem.forEach(function(item){
      let itemValueArr = item.value.trim();
      if(itemValueArr !== ''){
        this.addIncome.push(itemValueArr);
      }
    }, this)
  },
  getExpensesMonth: function(){
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },
  getBudget: function(){
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function(){
    return targetAmount.value / this.budgetMonth;
  },
  getStatusIncome: function(){
    if(this.budgetDay >= 1200){
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200){
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay < 600){
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay <= 0){
      return ('Что то пошло не так');
    } 
  },
  getInfoDeposit: function(){
    if(this.deposit){
      let defPercent = this.percentDeposit = prompt('Какой годовой процент?', '10');
      this.percentDeposit = this.validateNumber(this.percentDeposit, 'Какой годовой процент?');

      let defMoney = this.moneyDeposit = prompt('Какой сумма заложена?', '10000');
      this.moneyDeposit = this.validateNumber(this.moneyDeposit, 'Какой сумма заложена?');
    }
  },
  calcPeriod: function(){
    return this.budgetMonth * periodSelect.value;
  },
  getPeriod: function(){

    let target = +event.target.value;
    this.period = target;
    periodAmount.innerHTML = periodSelect.value;
  },
  dinamikCalkPeriod: function(){
    let = incomePeriodVal = salaryAmount.value;
    incomePeriodValue.value = this.period * (this.budget - this.expensesMonth);
    return incomePeriodValue.value = this.period * this.budget;
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
  },
  noActivClickBtnStart: function(){
    start.disabled=true;
    console.log(start)
    let input = document.querySelectorAll('input');
    input.forEach(function(item){
      if(start.disabled == true){
        item.disabled = true;
        periodSelect.disabled = false;
      }
    });
    start.style.display = "none";
  },
  changeBtn: function(){
    let cancel = document.getElementById('cancel');
    cancel.addEventListener('click', function(e){
      let target = e.target;
      let input = document.querySelectorAll('input');
      input.forEach(function(item){
        console.dir(item)
        item.value = '';
        if(item.value == ''){
          start.style.display = "block";
          cancel.style.display = "none";
          setTimeout(window.location.reload.bind(window.location), 1000);
        }
      });
    })
        cancel.style.display = "block"; 
    }
};

let startCalc = appData.start.bind(appData);
let changeBtn = appData.start.bind(appData);


let salaryAmountVal = salaryAmount.addEventListener('input', function(){
  if(isNumber(salaryAmount.value)){
    start.addEventListener('click', startCalc);
  }
})

cancel.addEventListener('click', changeBtn);
btnPlus.addEventListener('click', appData.addIncomeBlock);
btnPlus2.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', appData.getPeriod);



// periodSelect.addEventListener('input', appData.dinamikCalkPeriod);
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

// console.log(appData);
