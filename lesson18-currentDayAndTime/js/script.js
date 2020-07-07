const greeting = document.querySelector('.greeting'),
	week = document.querySelector('.week'),
	time = document.querySelector('.time'),
	year = document.querySelector('.year');


let date = new Date();
let weekDay = date.getDay() -1;
let weeks = ['Понедельник', 'Вторник', 'Среда'];
weeks.forEach(function(item, index){
	if(index == weekDay){
		week.textContent = `Сегодня: ${item}`;
	}
})
