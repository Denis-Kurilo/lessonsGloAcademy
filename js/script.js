let money = +prompt('Ваш месячный доход?',''),
	addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
	deposit = confirm('Есть ли у вас депозит в банке?'),
	mission = 500000,
	expenses1 = prompt('Введите обязательную статью расходов?'),
	expenses2 = prompt('Введите обязательную статью расходов?'),
	amount1 = +prompt('Во сколько это обойдется?'),
	amount2 = +prompt('Во сколько это обойдется?'),
	budgetMonth = money - amount1 - amount2,
	month = Math.ceil(mission / budgetMonth),
	budgetDay = Math.floor(budgetMonth / 30);

if(!Number(money), !Number(amount1), !Number(amount2)){
	alert('Вы не ввели число. Ведите числовое значение');
}

console.log(addExpenses.split(', '));
console.log(typeof deposit);
console.log(expenses1 + ' ' + amount1);
console.log(expenses2 + ' ' + amount2);
console.log('Бюджет на месяц ' + budgetMonth);
console.log(`Будет достигнута цель за ${month} месяцев.`);
console.log('Бюджет на месяц ' + budgetDay);

if(budgetDay >= 1200){
	console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200){
	console.log('У вас средний уровень дохода');
} else if (budgetDay < 600){
	console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay <= 0){
	console.log('Что то пошло не так');
}



