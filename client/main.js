import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Todos } from '../imports//collections.js';

tether = require('tether');
global.Tether = tether;


// Import Bootstrap js npm module.
bootstrap = require('bootstrap');


import './main.html';

Template.main.onCreated(function helloOnCreated() {
	// counter starts at 0
	this.counter = new ReactiveVar(0);
	console.log('lalala');
	console.log('todos: ', Todos);
});

Template.main.helpers({
	counter() {
		return Template.instance().counter.get();
	},
});

Template.main.events({
	'click button'(event, instance) {
		// increment the counter when button is clicked
		instance.counter.set(instance.counter.get() + 1);
	},
});
