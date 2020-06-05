
let money = 40000,
	income = 'фриланс',
	addExpenses = 'Интернет, Коммуналка, Спорт зал, Машина',
	deposit = true,
	mission = 500000,
	period = 12,
	budgetDay = Math.round(money / 30);

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев и Цель заработать ${mission} рублей”`);
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay + ' руб');