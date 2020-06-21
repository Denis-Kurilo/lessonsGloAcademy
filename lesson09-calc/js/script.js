// `use strict`;
let start = document.getElementById('start'),
	btnPlus = document.getElementsByTagName('button')[0],
	btnPlus2 = document.getElementsByTagName('button')[1],
	depositСheckmark = document.querySelector('.deposit-checkmark'),
	resultAdditionalIncome = document.querySelectorAll('.result-additional_income'),
	budgetDayValue = document.querySelector('.budget_day-value'),
	expensesMonthValue = document.querySelector('.expenses_month-value'),
	additionalExpensesValue = document.querySelector('.additional_expenses-value'),
	incomePeriodValue = document.querySelector('.income_period-value'),
	targetMonthValue = document.querySelector('.target_month-value'),
	salaryAmount = document.querySelector('.salary-amount'),
	incomeTitle = document.querySelector('.income-title'),
	incomeAmount = document.querySelector('.income-amount'),
	additionalIncomeItem = document.querySelector('.additional_income-item'),
	additionalIncomeItem2 = document.querySelector('.additional_income-item'),
	expensesTitle = document.querySelector('.expenses-title'),
	expensesItems = document.querySelectorAll('.expenses-items'),
	additionalExpensesItem = document.querySelector('.additional_expenses-item'),
	targetAmount = document.querySelector('.target-amount'),
	periodAmount = document.querySelector('.period-amount');


let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
  income: {}, 
  addIncome: [], 
  expenses: {}, 
  addExpenses: [], 
  deposit: false,
  percentDeposit: 0, 
  moneyDeposit: 0,
  mission: 500000,
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
	  }
	  appData.budget = salaryAmount.value;
	  appData.getExpenses();
	  appData.getExpensesMonth();
	  appData.getBudget();
	},
	showResult: function(){
		
	}
	addExpensesBlock: function(){
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlus2);
		expensesItems = document.querySelectorAll('.expenses-items');
		if(expensesItems.length === 3){
			btnPlus2.style.display = 'none';
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
  asking: function(){
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

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');

    let strAddExpenses = appData.addExpenses.join(", ");

    function replacement(strAddExpenses) {
      return strAddExpenses.replace(/(^|\s)\S/g, function(a) {return a.toUpperCase()})
    }
    // console.log(replacement(strAddExpenses));
    
   

    /*let cost;
    for (let i = 0; i < 2; i++){
      let itemOfExpenditure;
      itemOfExpenditure = prompt('Введите обязательную статью расходов?');

      while(isNumber(itemOfExpenditure)){
        alert("Вы ввели не строку!!!");
        itemOfExpenditure = prompt('Введите обязательную статью расходов?');
      }
     
      do{
        cost = +prompt('Во сколько это обойдется?');  
      }while(!isNumber(cost));
        appData.expenses[itemOfExpenditure] = cost; 
    }*/
    this.expensesMonth += this.getExpensesMonth();
    this.budgetMonth += this.getBudget();

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
      let defPercent = appData.percentDeposit = prompt('Какой годовой процент?', '10');
      appData.percentDeposit = appData.validateNumber(this.percentDeposit, 'Какой годовой процент?');

      let defMoney = appData.moneyDeposit = prompt('Какой сумма заложена?', '10000');
      appData.moneyDeposit = appData.validateNumber(this.moneyDeposit, 'Какой сумма заложена?');
    }
  },
  calcSavedMoney: function(){
    return appData.budgetMonth * appData.period;
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



appData.asking();
appData.getInfoDeposit();

appData.budgetDay = Math.floor(appData.getBudget() / 30);


start.addEventListener('click', appData.start);
btnPlus2.addEventListener('click', appData.addExpensesBlock);


if(appData.getTargetMonth() < 0 ){
  console.log('Цель не будет достигнута ' + appData.getTargetMonth());
 } else {
  console.log('Будет достигнута цель ' + appData.getTargetMonth()); 
 }








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


