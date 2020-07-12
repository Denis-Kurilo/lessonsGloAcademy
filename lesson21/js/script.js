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
	};
	countTimer('12 july 2020');

	//menu
	const toggleMenu = () =>{
		const btnMenu = document.querySelector('.menu'),
		 menu = document.querySelector('menu'),
		 closeBtn = document.querySelector('.close-btn');

		 menu.addEventListener('click', (event) =>{
		 	event.preventDefault();
		 	let target = event.target
		 
		 		if(target.closest('li')){
		 			menu.classList.toggle('active-menu');
		 		}

		 		if(target.closest('.close-btn')){
		 			menu.classList.toggle('active-menu');
		 		}
		 });

		 btnMenu.addEventListener('click', () => {
		 	menu.classList.toggle('active-menu');
		 });
	};
	toggleMenu();

	//animation popUp
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
			popupBtn = document.querySelectorAll('.popup-btn');

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
		
		popup.addEventListener('click', (event) =>{
			let target = event.target;
				if(target.classList.contains('popup-close')){
					popup.style.display = 'none';
				}else{
					target = target.closest('.popup-content');
					if(!target){
						popup.style.display = 'none';
					}	
				}
		});
	};
	togglePopUp();

	//scroll-down
	const scrollDown = () => {
		const anchors = document.querySelectorAll('menu a[href^= "#"], main a[href^= "#"]');
			for (let anchor of anchors){
				anchor.addEventListener('click', (event) =>{
					event.preventDefault();
					const blockId = anchor.getAttribute('href');

					document.querySelector('' + blockId).scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					})
				});
			}
	};
	scrollDown();

	//tabs
	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContent = (index) =>{
			for(let i = 0; i < tabContent.length; i++){
				if(index == i){
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none')
				}else{
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none')
				}
			}
		};

		tabHeader.addEventListener('click', (event) => {
			let target = event.target;
			target = target.closest('.service-header-tab');
			if(target){
				tab.forEach((item, index) =>{
					if(item === target){
						toggleTabContent(index);
					}
				});
			}	
		});
	};
	tabs();

	//slider
	const addDots = () =>{
		const slide = document.querySelectorAll('.portfolio-item'),
			portfolioDots = document.querySelector('.portfolio-dots');
		for (let i = 0; i < slide.length; i++){
			let newDot = document.createElement('li');
			newDot.classList.add('dot');
			portfolioDots.append(newDot);
		}
	};
	addDots();
	const slider = () =>{
		const slide = document.querySelectorAll('.portfolio-item'),
			btn = document.querySelectorAll('.portfolio-btn'),
			dot = document.querySelectorAll('.dot'),
			portfolioDots = document.querySelector('.portfolio-dots'),
			slider = document.querySelector('.portfolio-content');

			let currentSlide = 0,
				interval;

		  const addActiveClass = () =>{
				const dot = document.querySelectorAll('.dot');
				for(let i = 0; i < dot.length; i++){
					dot[0].classList.add('dot-active');
				}
			};
			addActiveClass();

			const prevSlide = (elem, index, strClass) =>{
				elem[index].classList.remove(strClass);
			};

			const nextSlide = (elem, index, strClass) =>{
				elem[index].classList.add(strClass);
			};

			const autoPlaySlide = () =>{

				prevSlide(slide, currentSlide, 'portfolio-item-active');
				prevSlide(dot, currentSlide, 'dot-active');
				currentSlide++;
				if(currentSlide >= slide.length){
					currentSlide = 0;
				}
				nextSlide(slide, currentSlide, 'portfolio-item-active');
				nextSlide(dot, currentSlide, 'dot-active');
			};

			const startSlide = (time = 3000) =>{
				interval = setInterval(autoPlaySlide, time);
			};

			const stopSlide = () =>{
				clearInterval(interval);
			};

			slider.addEventListener('click', (event) => {
				event.preventDefault();

				let target = event.target;

				if(!target.matches('.portfolio-btn, .dot')){
					return;
				}

				prevSlide(slide, currentSlide, 'portfolio-item-active');
				prevSlide(dot, currentSlide, 'dot-active');

				if(target.matches('#arrow-right')){
					currentSlide++;
				}else if(target.matches('#arrow-left')){
					currentSlide--;
				} else if(target.matches('.dot')){
						dot.forEach((elem, index) => {
							if(elem === target){
								currentSlide = index;
							}
						});
				}

				if(currentSlide >= slide.length){
					currentSlide = 0;
				}

				if(currentSlide < 0){
					currentSlide = slide.length -1;
				}

				nextSlide(slide, currentSlide, 'portfolio-item-active');
				nextSlide(dot, currentSlide, 'dot-active');

			});

			slider.addEventListener('mouseover', (event) =>{
				if(event.target.matches('.portfolio-btn') ||  
					event.target.matches('.dot'))
					{
					stopSlide();
				}
			});

			slider.addEventListener('mouseout', (event) =>{
				if(event.target.matches('.portfolio-btn') ||  
					event.target.matches('.dot')){
					startSlide();
				}
			});

			startSlide(4000);
	};
	slider();

});