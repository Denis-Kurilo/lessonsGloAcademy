let isNumber = function(n){
	return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
	income = 'фриланс',
	addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
	deposit = confirm('Есть ли у вас депозит в банке?'),
	mission = 500000;

let start = function(){
	do{
		money = prompt('Ваш месячный доход?');
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

let expenses = [];

const getExpensesMonth = function(){
	let sum = 0;
	for (let i = 0; i< 2; i++){
		expenses[i] = prompt('Введите обязательную статью расходов?');

		sum += +prompt('Во сколько это обойдется?', 5000);	
	}
	if(!isNaN(sum)){
		return sum;
	} else{
		console.error('Значение не явлется числом!!!!');
	}
	console.log(expenses);
};

let expensesAmount = getExpensesMonth();
let accumulatedMonth = getAccumulatedMonth();
let budgetDay = Math.floor(accumulatedMonth / 30);

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



