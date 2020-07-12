'use strict';

class Todo {
	constructor(form, input, todoList, todoComplaeted){
		this.form = document.querySelector(form);
		this.input = document.querySelector(input);
		this.todoList = document.querySelector(todoList);
		this.todoComplaeted = document.querySelector(todoComplaeted);
		this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
	}
	addToStorage(){
		localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
	}
	render(){
		this.todoList.textContent = '';
		this.todoComplaeted.textContent = '';
		this.todoData.forEach(this.createItem, this);
		this.addToStorage();
	}
	createItem(todo){
		const li = document.createElement('li');
		li.classList.add('todo-item');
		li.key = todo.key;
		li.insertAdjacentHTML('beforeend', `
			<span class="text-todo">${todo.value}</span>
			<div class="todo-buttons">
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
			</div>
			`);
		if(todo.completed){
			this.todoComplaeted.append(li);
		}else{
			this.todoList.append(li)
		}
	}
	addTodo(e){	
		e.preventDefault();
		console.log(this)
		if(this.input.value.trim()){
			const newTodo = {
				value: this.input.value, 
				completed: false,
				key: this.generateKey(),
			};
			this.input.value = '';
			this.todoData.set(newTodo.key, newTodo);
			this.render();
		}else{
			alert('Вы не ввели задачу');
		}
	}
	generateKey(){
		return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	}

	deleteItem(key, todoItem){
		//Нужно будет по ключу найти элемент и удалить из new Map и после сделать render()
		console.log('Удалить')
		console.log(key)
	}

	complaetedItem(key){
		this.todoData.forEach((elem) => {
			while(key === elem.key){
				console.log(key + ' === ' + elem.key)
				if(elem.completed == true ){
					elem.completed = false;
				}else{
					elem.completed = true;
				}
				this.addToStorage();
				this.render();
				key++;
			}
		});
	}

	handler(){
		const todoItem = document.querySelectorAll('.todo-item');
		todoItem.forEach((elem) => {
			elem.addEventListener('click', (e) => {
				let target = e.target;
				if(target.matches('.todo-remove')){
					let key = elem.key;
					this.deleteItem(key, todoItem);
				}
				else if(target.matches('.todo-complete')){
					let key = elem.key;
					this.complaetedItem(key);
				}
			});
		});
	}

	init(){
		this.form.addEventListener('submit', this.addTodo.bind(this));
		this.render();
		this.handler();
	}
}
const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
todo.init();
