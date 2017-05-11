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
			userId: Meteor.userId(),
			username: Meteor.user().username,
		})
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
		Todos.update(this._id, {$set: {checked: !this.checked}});
		return false;
	},

	"click .delete-todo": function () {
		// cancel click if not logged in
		if (!Meteor.userId()) {
			return false;
		}

		if (confirm("Are you sure?")) {
			Todos.remove(this._id);
		}
	}
});

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});
