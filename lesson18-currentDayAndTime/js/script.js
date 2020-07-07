const greeting = document.querySelector('.greeting'),
	week = document.querySelector('.week'),
	time = document.querySelector('.time'),
	year = document.querySelector('.year');

let date = new Date();

function getGreeting(timeOfDay){
	let hours = date.getHours(); 
	if(hours >= 6 && hours < 12){
		greeting.textContent = 'Доброе утро';
	} else if(hours >= 12 && hours < 18){
		greeting.textContent = 'Добрый день';
	} else if(hours >= 18 && hours < 24){
		greeting.textContent = 'Добрый вечер';
	} else if(hours >= 24 && hours < 6){
		greeting.textContent = 'Добрый вечер';
	}
}
getGreeting();

function getWeek(){
	let weekDay = date.getDay() -1;
	let weeks = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
	weeks.forEach(function(item, index){
		if(index == weekDay){
			week.textContent = `Сегодня: ${item}`;
		}
	})	
}
getWeek();

let currentTime = date.toLocaleTimeString();
time.textContent = `${currentTime} PM`;

let newYear = new Date('December 31 2020');
let currentDay = Date.now();
let res = newYear - currentDay;
res /= 1000;
res /= 60;
res /= 60;
res /= 24;
year.textContent = `До нового года осталось ${Math.floor(res)} дней`;

