const validationForm = () =>{
	const form1 = document.getElementById('form1'),
		form2 = document.getElementById('form2'),
		form3 = document.getElementById('form3');
		
	maskPhone('#form1-phone');
	maskPhone('#form2-phone');
	maskPhone('#form3-phone');

	form1.addEventListener('input', (e)  =>{
		let target = e.target;
		if(target.matches('#form1-name')){
			let input = target.value;
			target.value = input.replace(/[^а-яёА-ЯЁ\s]+/ig, '');
		}else if(target.matches('#form1-phone')){
			target.setAttribute('maxlength', '18');
		}
	});
	form2.addEventListener('input', (e)  =>{
		let target = e.target;
		if(target.matches('#form2-name') || 
			target.matches('#form2-message')){
			let input = target.value;
			target.value = input.replace(/[^а-яёА-ЯЁ\s]+/ig, '');
		}else if(target.matches('#form2-phone')){
			target.setAttribute('maxlength', '18');
		}
	});
	form3.addEventListener('input', (e)  =>{
		let target = e.target;
		if(target.matches('#form3-name')){
			let input = target.value;
			target.value = input.replace(/[^а-яёА-ЯЁ\s]+/ig, '');
		}else if(target.matches('#form3-phone')){
			target.setAttribute('maxlength', '18');
		}
	});
};
export default validationForm;