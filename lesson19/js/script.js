window.addEventListener('DOMContentLoaded', function(){
	'use strict';
	let count = 0;
	let animateModal;

//Timer
	function countTimer(deadline){
		let timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');

		function getTimeRemaining(){
			let	dateStop = new Date(deadline).getTime(),
			dateNow = new Date().getTime(),
			timeRemaining = (dateStop - dateNow) / 1000,
			seconds = Math.floor(timeRemaining % 60),
			minutes = Math.floor((timeRemaining / 60) % 60),
			hours = Math.floor(timeRemaining / 60 / 60) % 24;
			return{timeRemaining, hours, minutes, seconds};
		}
		function updateClock(){
			let timer = getTimeRemaining();
			if(timer.timeRemaining > 0){
				timerHours.textContent = timer.hours;
				timerMinutes.textContent = timer.minutes;
				timerSeconds.textContent = timer.seconds;
				if(timerHours.textContent < 10){
				timerHours.textContent = `0${timer.hours}`;
				}
				if(timerMinutes.textContent < 10){
					timerMinutes.textContent = `0${timer.minutes}`;
				}
				if(timerSeconds.textContent < 10){
					timerSeconds.textContent = `0${timer.seconds}`;
				}
			} else if(timer.timeRemaining < 0){
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
			}	
		}
		setTimeout(updateClock, 1000);
		setInterval(updateClock, 1000)
		updateClock();		
	}
	countTimer('12 july 2020');


	//menu
	const toggleMenu = () =>{
		const btnMenu = document.querySelector('.menu'),
		 menu = document.querySelector('menu'),
		 closeBtn = document.querySelector('.close-btn'),
		 menuItems = menu.querySelectorAll('ul>li');
		 
		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		}
		btnMenu.addEventListener('click', handlerMenu);
		closeBtn.addEventListener('click', handlerMenu);

		menuItems.forEach((item) =>{
			item.addEventListener('click', handlerMenu);
		});
	};
	toggleMenu();

	let animationPopUp = () =>{	
		const popupContent = document.querySelector('.popup-content');
		count++;
		if(count < 200){
			popupContent.style.top = count + 'px';	
			animateModal = requestAnimationFrame(animationPopUp, 10);
		}else{
			cancelAnimationFrame(animateModal);
		};
	};

	//popup
	const togglePopUp = () =>{
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupClose = document.querySelector('.popup-close');

		popupBtn.forEach((item) =>{
			item.addEventListener('click', (e) =>{
				let target = event.target;
				if(popup.style.display === 'none'){
					cancelAnimationFrame(animateModal);
					count = 0;
					if(target){
						animationPopUp();
					}
				}else{
					animateModal = requestAnimationFrame(animationPopUp, 10);
				}
				popup.style.display = 'block';
			
				if(screen.width < 768){
					cancelAnimationFrame(animateModal);
				}
			});
		});
		
		popupClose.addEventListener('click', () =>{
			popup.style.display = 'none';	
		});
	};
	togglePopUp();

	//scroll-down
	/*const scrollDown = () => {
		const scrollBtn = document.querySelector('main>a');
		scrollBtn.addEventListener('click', (event) =>{
			event.preventDefault();
			
		});
	}
	scrollDown();*/
});