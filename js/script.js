let money = +prompt('Ваш месячный доход?',''),
	income = 'фриланс',
	addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
	deposit = confirm('Есть ли у вас депозит в банке?'),
	mission = 500000,
	expenses1 = +prompt('Введите обязательную статью расходов?'),
	expenses2 = +prompt('Введите обязательную статью расходов?'),
	// amount1 = prompt('Во сколько это обойдется?'),
	// amount2 = prompt('Во сколько это обойдется?'),
	budgetMonth = money - expenses1 - expenses2,
	month = Math.ceil(mission / budgetMonth),
	budgetDay = Math.floor(budgetMonth / 30);

if(!Number(money), !Number(expenses1), !Number(expenses2)){
	alert('Вы не ввели число. Ведите числовое значение');
}

console.log(addExpenses.length);
console.log(deposit);
console.log(budgetMonth);
console.log(`будет достигнута цель за ${month} месяцев.`);
console.log(budgetDay);

if(budgetDay >= 1200){
	console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200){
	console.log('У вас средний уровень дохода');
} else if (budgetDay < 600){
	console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay <= 0){
	console.log('Что то пошло не так');
}



