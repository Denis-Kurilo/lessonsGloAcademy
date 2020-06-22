const books = document.querySelectorAll('.book'),
	adv = document.querySelector('.adv'),
	book4 = books[4].querySelector('h2 a'),
	book6 = books[2].querySelector('ul');


books[4].querySelector('h2').remove();

books[0].before(books[1]);
books[2].before(books[4]);
books[2].before(books[4]);
books[2].before(books[3]);
books[2].before(books[5]);

adv.remove();
document.body.style.backgroundImage = "url(./image/adv.jpg)";
const newElemh2 = document.createElement('h2'); 
books[4].prepend(newElemh2); 
newElemh2.innerHTML = '<a href="#">Книга 3. this и Прототипы Объектов</a>';

//Глава 2
let liBook2 = books[0].querySelectorAll('li');
liBook2[6].after(liBook2[5]);
liBook2[5].after(liBook2[8]);
liBook2[4].before(liBook2[6]);
liBook2[5].before(liBook2[8]);
liBook2[4].before(liBook2[8]);

//Глава 5
let liBook5 = books[5].querySelectorAll('li');
liBook5[1].after(liBook5[9]);
liBook5[2].before(liBook5[3])
liBook5[2].before(liBook5[4])

//Глава 6
book6.insertAdjacentHTML('beforeend','<li> Глава 8: За пределами ES6 </li>');