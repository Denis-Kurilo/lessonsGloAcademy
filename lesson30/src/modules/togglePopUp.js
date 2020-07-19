const togglePopUp = () =>{
	const popup = document.querySelector('.popup'),
		popupBtn = document.querySelectorAll('.popup-btn');
	let count = 0;
	let animateModal;

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
export default togglePopUp;