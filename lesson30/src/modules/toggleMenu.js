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
export default toggleMenu;