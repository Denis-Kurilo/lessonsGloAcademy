// `use strict`;
let start = document.getElementById('start'),
	btnPlus = document.getElementsByTagName('button')[0],
	btnPlus2 = document.getElementsByTagName('button')[1],
	additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  depositСheck = document.querySelector('#deposit-check'),
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],  //!
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
	incomeItems = document.querySelectorAll('.income-items');


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
  period: 3,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function(){
	  /*do{
	    money = +prompt('Ваш месячный доход?');
	  }while(!isNumber(money))*/

	  if(salaryAmount.value === ''){
	  	alert('Ошибка, поле "Месячный доход" должно быть заполненно!');
	  	return;
	  };

	  appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.showResult();
    appData.asking();
    // appData.getInfoDeposit();

	},
	showResult: function(){
    budgetMonthValue.value = appData.budgetMonth;
		budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();
	},
	addExpensesBlock: function(){
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlus2);
		expensesItems = document.querySelectorAll('.expenses-items');
		if(expensesItems.length === 3){
			btnPlus2.style.display = 'none';
		}
	},
  getIncome: function(){
     if(confirm('Есть у вас дополнительный заработок?')){
      let itemIncome = prompt('Какой у вас дополнительный заработок', 'Такси');

     while (isNumber(itemIncome)){
      alert("Вы ввели не строку!!!");
      itemIncome = prompt('Какой у вас дополнительный заработок', 'Такси');
    } 

    let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете', 10000);


     if(isNumber(cashIncome)){
     appData.income[itemIncome] = cashIncome;   
    } else{
      appData.income[itemIncome] = appData.validateNumber(cashIncome, 'Сколько в месяц вы на этом зарабатываете');
      }
    }

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

    /*appData.addExpenses = addExpenses.toLowerCase().split(', ');
    let strAddExpenses = appData.addExpenses.join(", ");

    function replacement(strAddExpenses) {
      return strAddExpenses.replace(/(^|\s)\S/g, function(a) {return a.toUpperCase()})
    }*/
  },
  getAddIncome: function(){
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        appData.addIncome.push(itemValue);
      }
    })
  },
  asking: function(){
   

    // let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    // appData.addExpenses = addExpenses.toLowerCase().split(', ');

    // let strAddExpenses = appData.addExpenses.join(", ");

    
    
   /* this.expensesMonth += this.getExpensesMonth();
    this.budgetMonth += this.getBudget();*/
    function replacement(strAddExpenses) {
      return strAddExpenses.replace(/(^|\s)\S/g, function(a) {return a.toUpperCase()})
    }

    appData.deposit = confirm('Есть ли у вас депозит в банке?'); 
  },
  getExpensesMonth: function(){
    /*let arr = [], num;
    for (let key in appData.expenses){
      num = appData.expenses[key];
      arr.push(num);
    };
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    };
    return sum;*/

    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },

  getBudget: function(){
    // return appData.budget - appData.expensesMonth;
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function(){
    // return Math.ceil(appData.mission / appData.getBudget());
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
start.addEventListener('click', appData.start);

btnPlus2.addEventListener('click', appData.addExpensesBlock);



// appData.budgetDay = Math.floor(appData.getBudget() / 30);




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
// console.log('Наша программа включает в себя данные:');



/*for(let key in appData){
  console.log(`Ключ: ${key} Значение: ${appData[key]} `);
}*/


