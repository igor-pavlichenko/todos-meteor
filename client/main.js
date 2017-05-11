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
		Meteor.call('addTodo', text);
		// clear input
		event.target.text.value = "";

		// prevent submit
		return false;
	},

	"click .toggle-checked": function () {
		// cancel click if not logged in
		if (!Meteor.userId()) {
			return false;
		}

		console.info("toggle-checked clicked!");
		Meteor.call('setChecked', this._id, !this.checked);
		return false;
	},

	"click .delete-todo": function () {
		// cancel click if not logged in
		if (!Meteor.userId()) {
			return false;
		}

		if (confirm("Are you sure?")) {
			Meteor.call('deleteTodo', this._id);
		}
	}
});

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});
