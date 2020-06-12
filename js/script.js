
let isNumber = function(n){
	return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
	income = 'фриланс',
	addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
	deposit = confirm('Есть ли у вас депозит в банке?'),
	mission = 500000,
	expenses = [];

let start = function(){
	do{
		money = +prompt('Ваш месячный доход?');
	}while(!isNumber(money))
};
start();

let showTypeOf = function(data){
	console.log(data, typeof(data))
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.toLowerCase().split(', '));

let expensesAmount = getExpensesMonth();
let accumulatedMonth = getAccumulatedMonth();
let budgetDay = Math.floor(accumulatedMonth / 30);

let getStatusIncome = function(){
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

function getExpensesMonth (){
	let sum = 0;
	let cost;
	for (let i = 0; i < 2; i++){
		expenses[i] = prompt('Введите обязательную статью расходов?');
		do{
			cost = +prompt('Во сколько это обойдется?');	
		}while(!isNumber(cost))
		sum += cost;
	}
	return sum;
	console.log(expenses);
};

console.log('Расходы за месяц', expensesAmount);

function getAccumulatedMonth() {
	return money - expensesAmount;
}
console.log('Накопления за месяц ', accumulatedMonth);

function getTargetMonth(){
	 return Math.ceil(mission / accumulatedMonth);	 
}
if(getTargetMonth() < 0 ){
 	console.log('Цель не будет достигнута ' + getTargetMonth());
 } else {
 	console.log('Будет достигнута цель ' + getTargetMonth()); 
 }
console.log(getStatusIncome());