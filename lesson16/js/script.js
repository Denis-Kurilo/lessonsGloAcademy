`use strict`;
const start = document.getElementById('start'),
  cancel = document.getElementById('cancel'),
  btnPlus = document.getElementsByTagName('button')[0],
  btnPlus2 = document.getElementsByTagName('button')[1],
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  depositСheck = document.getElementById('deposit-check'),
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
  additionalExpenses = document.querySelector('.additional_expenses'),
  periodSelect = document.querySelector('.period-select'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodAmount = document.querySelector('.period-amount'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent');

  let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');
 
const isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

class AppData {
  constructor(){
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
  }
  start(){
    this.budget = +salaryAmount.value;
    this.getPeriod();
    this.dinamikCalkPeriod();
    this.getExpInc();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.validatePercent();
    this.getBudget();
    this.showResult();
    this.noActivClickBtnStart();
    this.reset();
  }
  showResult(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', this.dinamikCalkPeriod);
  }
  addExpensesBlock(){
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlus2);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
      btnPlus2.style.display = 'none';
    }
  }
  addIncomeBlock(){
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
      btnPlus.style.display = 'none';
    }
  }

  getExpInc(){
  const count = (item) =>{
    const startStr = item.className.split('-')[0]; 
    const itemTitle = item.querySelector(`.${startStr}-title`).value;
    const itemAmoun = item.querySelector(`.${startStr}-amount`).value;
    if( itemTitle !== '' && itemAmoun !== ''){
      this[startStr][itemTitle] = itemAmoun;
    }
  }

  incomeItems.forEach(count);
  expensesItems.forEach(count);

  for(let key in this.income){
      this.incomeMonth += +this.income[key];
    }
  }
  getAddExpenses(){
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) =>{
      item = item.trim(item);
      if(item !== ''){
        this.addExpenses.push(item);
      }
    });
  }
  getAddIncome(){          
    additionalIncomeItem.forEach((item) =>{
      const itemValueArr = item.value.trim();
      if(itemValueArr !== ''){
        this.addIncome.push(itemValueArr);
      }
    })
  }
  getExpensesMonth(){
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }
  getBudget(){
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100)
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  getTargetMonth(){
    return targetAmount.value / this.budgetMonth;
  }
  getStatusIncome(){
    if(this.budgetDay >= 1200){
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200){
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay < 600){
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay <= 0){
      return ('Что то пошло не так');
    } 
  }
  getInfoDeposit(){
    if(this.deposit){
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }
  calcPeriod(){
    return this.budgetMonth * periodSelect.value;
  }
  getPeriod(){
    this.period = periodSelect.value;
    periodAmount.innerHTML = periodSelect.value;
  }
  dinamikCalkPeriod(){
    const incomePeriodVal = periodSelect.value * budgetMonthValue.value;
    incomePeriodValue.value = incomePeriodVal;
  }
  validateNumber(name, text){
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
  noActivClickBtnStart(){
    start.disabled = true;
    const input = document.querySelectorAll('input');
    input.forEach((item) =>{
      if(start.disabled == true){
        item.disabled = true;
        periodSelect.disabled = false;
      }
    });
    start.style.display = "none";
  }
  reset(){
    cancel.style.display = "block";
    cancel.addEventListener('click',() =>{
      depositСheck.checked = false;

      let objCopy = Object.assign({}, appData);
      objCopy = appData;
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
        input.forEach((item) =>{
          item.value = '';
          item.disabled = false;
        });
        periodSelect.value = 1;
        periodAmount.innerHTML = 1;
        start.style.display = "block";
        cancel.style.display = "none";
      });
  }
  validatePercent(){
    let validateSelect = depositPercent.value;
    if(!isNumber(validateSelect) || depositPercent.value > 100){
      alert('Введите корректное значение');
      depositPercent.value = '';
      start.disabled = true;
    }else{
      start.disabled = false;
    }
  }
  changePercent(){
    const valueSelect = this.value;
    const validateSelect = depositPercent.value;
    if(valueSelect === 'other'){
      depositPercent.style.display = 'inline-block';
      depositPercent.value = '';
    }else{
      depositPercent.value = valueSelect;
      depositPercent.style.display = 'none';
    }
  }
  depositHandler(){
    if(depositСheck.checked){
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
      depositPercent.addEventListener('input', this.validatePercent);
    }else{
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }
  eventListeners(){
    const salaryAmountVal = salaryAmount.addEventListener('input',() =>{
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

    depositСheck.addEventListener('change', this.depositHandler.bind(this));
  }
}

const appData = new AppData();
appData.eventListeners();


// periodSelect.addEventListener('input', appData.dinamikCalkPeriod);
/*if(appData.getTargetMonth() < 0 ){
  console.log('Цель не будет достигнута ' + appData.getTargetMonth());
 } else {
  console.log('Будет достигнута цель ' + appData.getTargetMonth()); 
 }
*/

