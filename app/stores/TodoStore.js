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
            'complete': false
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
    onAddTodo: function(payload) {
        this.todos.push({
            text: payload.text,
            complete: false
        });
        this.emit('change');
    },
    onToggleTodo: function(payload) {
        payload.todo.complete = !payload.todo.complete;
        this.emit('change');
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
