'use strict';
	
	import "formdata-polyfill";
	import "es6-promise";
	import "fetch-polyfill";
	import "@babel/polyfill";
	import 'nodelist-foreach-polyfill';
	import elementClosest from 'element-closest';
	elementClosest(window);

	import countTimer from '../src/modules/countTimer';
	import toggleMenu from '../src/modules/toggleMenu';
	import togglePopUp from '../src/modules/togglePopUp';
	import scrollDown from '../src/modules/scrollDown';
	import tabs from '../src/modules/tabs';
	import slider from '../src/modules/slider';
	import calculate from '../src/modules/calculate';
	import sendForm from '../src/modules/sendForm';
	import validationForm from '../src/modules/validationForm';
	import team from '../src/modules/team';
 
	//Timer
	countTimer('20 july 2021');

	//menu
	toggleMenu();

	//animation popUp
	// animationPopUp();

	//popup
	togglePopUp();

	//scroll-down
	scrollDown();

	//tabs
	tabs();

	//slider
	slider(); 

	//calculate
	calculate(100);

	//send-ajax-form
  	sendForm();
  
	//phone Validation
	validationForm();

	//Our team
	team();