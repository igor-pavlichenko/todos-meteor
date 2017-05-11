import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Todos } from '../imports/collections.js';

tether = require('tether');
global.Tether = tether;
global.Todos = Todos;


// Import Bootstrap js npm module.
bootstrap = require('bootstrap');


import './main.html';

Template.main.onCreated(function helloOnCreated() {
});

Template.main.helpers({
	todos() {
		return Todos.find({}, {sort: {createdAt: -1}});
	}
});

Template.main.events({
	"submit .new-todo": function (event) {
		let text = event.target.text.value;
		Todos.insert({
			text: text,
			createdAt: new Date(),
		})
		// clear input
		event.target.text.value = "";

		// prevent submit
		return false;
	},

	"click .toggle-checked": function () {
		console.info("toggle-checked clicked!");
		Todos.update(this._id, {$set: {checked: !this.checked}});
		return false;
	},

	"click .delete-todo": function () {
		if (confirm("Are you sure?")) {
			Todos.remove(this._id);
		}
	}
});
