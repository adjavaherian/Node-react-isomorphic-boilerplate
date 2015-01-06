var Fluxxor = require('fluxxor');
var constants = require('../constants');

module.exports = TodoStore = Fluxxor.createStore({
    initialize: function() {
        // fetch initial data here!
        this.todos = [{
            'text': 'asdfasdf',
            'complete': false
        }, {
            'text': 'asdfasdf',
            'complete': true
        }, {
            'text': '333',
            'complete': false
        }];
        // BIND actions that this store can take to dispatcher actions
        this.bindActions(
            constants.ADD_TODO, this.onAddTodo,
            constants.TOGGLE_TODO, this.onToggleTodo,
            constants.CLEAR_TODOS, this.onClearTodos
        );
    },
    // when the ADD_TODO action is called, the dispatcher notifies this store
    // and this store runs this function
    onAddTodo: function(payload) {
        // save data to server here
        this.todos.push({
            text: payload.text,
            complete: false
        });
        this.emit('change'); // this is like the `return false` for the dispatcher; when it gets this trigger, the dispatcher resolves its promise.
        // any components listening to changes to this store will grab the state from the store and re-render
    },
    onToggleTodo: function(payload) {
        payload.todo.complete = !payload.todo.complete; // payload.todo is passed by reference! so it updates this.todos as well
        console.log(JSON.stringify(this.todos)); // already updated!
        this.emit('change');
        console.log(JSON.stringify(this.todos)); // already updated!
    },
    onClearTodos: function() {
        this.todos = this.todos.filter(function(todo) {
            return !todo.complete;
        });
        this.emit('change');
    },
    getState: function() {
        return {
            todos: this.todos
        };
    }
});
