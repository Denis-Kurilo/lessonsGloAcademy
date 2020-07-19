const sendForm = () => {
	const errorMessage = 'Что то пошло не так',
	  loadMessage = 'Загрузка...',
	  successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

	const form = document.getElementById('form1'),
	     form2 = document.getElementById('form2'),
	     form3 = document.getElementById('form3');

	const statusMessage = document.createElement('div');
	statusMessage.style.cssText = 'font-size: 2rem;';

	const postData = (body) => {
		return fetch('./server.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});
	}
	const inputMaxLength = () => {
						if(form){
	          form[0].value = ''; 
	          form[1].value = ''; 
	          form[2].value = ''; 
	        }
	        if(form2){
	          form2[0].value = '';  
	          form2[1].value = '';  
	          form2[2].value = '';  
	          form2[3].value = '';  
	        }
	        if(form3){
	          form3[0].value = '';  
	          form3[1].value = '';  
	          form3[2].value = '';  
	        }
		}
		
	//form1
	form.addEventListener('submit', (event) => {
	  event.preventDefault();
	  form.appendChild(statusMessage);

	  statusMessage.textContent = loadMessage;
	  const formData = new FormData(form);
	  let body = {};
	  formData.forEach((val, key) => {
	    body[key] = val;
	  });   

	  postData(body)
	    .then((response) => {
	    	if(response.status !== 200){
	    		throw new Error('status network not 200.');
	    	}
	    	if(response.status == 200){
	    		inputMaxLength();
	    	}
	      statusMessage.textContent = successMessage;
	    })
	    .catch(error => {
	      statusMessage.textContent = errorMessage;
	      console.error(error);
	    });
	  });

	//form2
	form2.addEventListener('submit', (event) => {
	  event.preventDefault();
	  form2.appendChild(statusMessage);

	  statusMessage.textContent = loadMessage;
	  const formData = new FormData(form2);
	  let body = {};
	  formData.forEach((val, key) => {
	    body[key] = val;
	  });   

	  postData(body)
	    .then((response) => {
	    	if(response.status !== 200){
	    		throw new Error('status network not 200.');
	    	}
	    	if(response.status == 200){
	    		inputMaxLength();
	    	}
	      statusMessage.textContent = successMessage;
	    })
	    .catch(error => {
	      statusMessage.textContent = errorMessage;
	      console.error(error);
	    });
	});

	//form3
	form3.addEventListener('submit', (event) => {
	  event.preventDefault();
	  form3.appendChild(statusMessage);

	  statusMessage.textContent = loadMessage;
	  const formData = new FormData(form3);
	  let body = {};
	  formData.forEach((val, key) => {
	    body[key] = val;
	  });   

	  postData(body)
	    .then((response) => {
	    	if(response.status !== 200){
	    		throw new Error('status network not 200.');
	    	}
	    	if(response.status == 200){
	    		inputMaxLength();
	    	}
	      statusMessage.textContent = successMessage;
	    })
	    .catch(error => {
	      statusMessage.textContent = errorMessage;
	      console.error(error);
	    });
	});
};
export default sendForm;