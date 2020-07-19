const team = () =>{
	const command = document.getElementById('command');
	command.addEventListener('mouseover', (e) =>{
		const target = e.target;
		if(target.closest('img')){
			target.src = target.dataset.img;
		}
	});
	command.addEventListener('mouseout', (e) =>{
		let target = e.target;
		if(target.closest('img')){
			target.src = target.src.replace(/a(?=.jpg)/g, "");
		}
	});
};
export default team;