import { Meteor } from 'meteor/meteor';
import { Todos } from '../imports/collections.js';

Meteor.startup(() => {
	// code to run on server at startup

	Meteor.publish('todos', function () {
		return Todos.find();
	})
});
