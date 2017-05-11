import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Todos } from './imports/collections.js';

Meteor.methods({
	addTodo(text) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		check(text, String);

		Todos.insert({
			text: text,
			createdAt: new Date(),
			userId: Meteor.userId(),
			username: Meteor.user().username,
		});
	},

	deleteTodo(id) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		// check if current user owns that todo
		let todo = Todos.findOne(id);
		if(Meteor.userId() !== todo.userId) {
			throw new Meteor.Error('not-authorized');
		}

		check(id, String);

		Todos.remove(id);
	},

	setChecked(id, checked) {
		console.log('setChecked invoked!!!');
		if(!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		// check if current user owns that todo
		let todo = Todos.findOne(id);
		if(Meteor.userId() !== todo.userId) {
			throw new Meteor.Error('not-authorized');
		}

		check(id, String);
		check(checked, Boolean);

		Todos.update(id, {$set: {checked: checked}});
	}
});
