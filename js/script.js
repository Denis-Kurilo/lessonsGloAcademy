let money = +prompt('Ваш месячный доход?',''),
	income = 'фриланс',
	addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
	deposit = confirm('Есть ли у вас депозит в банке?'),
	mission = 500000,
	expenses1 = prompt('Введите обязательную статью расходов?'),
	expenses2 = prompt('Введите обязательную статью расходов?'),
	amount1 = +prompt('Во сколько это обойдется?'),
	amount2 = +prompt('Во сколько это обойдется?'),
	accumulatedMonth = getAccumulatedMonth(money, amount1, amount2),
	budgetDay = Math.floor(accumulatedMonth / 30);

if(!Number(money), !Number(amount1), !Number(amount2)){
	alert('Вы не ввели число. Ведите числовое значение');
}

let showTypeOf = function(data){
	console.log(data, typeof(data))
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.split(', '));
console.log(typeof deposit);
console.log(expenses1 + ' ' + amount1);
console.log(expenses2 + ' ' + amount2);

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
console.log(getStatusIncome());

const getExpensesMonth = function(amount1, amount2){
	return amount1 + amount2;
}
console.log('Расходы за месяц', getExpensesMonth(amount1, amount2));

function getAccumulatedMonth(money, amount1, amount2) {
	return money - amount1 - amount2;
}
console.log('Накопления за месяц ', accumulatedMonth)

function getTargetMonth(mission, accumulatedMonth){
	 return mission / accumulatedMonth;
}
console.log('Будет достигнута цель ', Math.ceil(getTargetMonth(mission, accumulatedMonth)));