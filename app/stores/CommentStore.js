var Fluxxor = require('fluxxor');
var constants = require('../constants');

module.exports = TodoStore = Fluxxor.createStore({
    initialize: function() {
        // fetch initial data here!
        this.comments = [{
            "id": "1",
            "author": "Fede Torre",
            "text": "This is the first comment on the l!!!ist."
        }, {
            "id": "2",
            "author": "Jordan Walk",
            "text": "Things come and go."
        }];
        // request('http://localhost:3000/comments.json', function(error, response, body) {
        //     this.comments = body;
        // })

        // BIND actions that this store can take to dispatcher actions
        this.bindActions(
            // constants.ADD_TODO, this.onAddTodo,
            // constants.TOGGLE_TODO, this.onToggleTodo,
            // constants.CLEAR_TODOS, this.onClearTodos
        );
    },
    // onAddTodo: function(payload) {
    //     this.todos.push({
    //         text: payload.text,
    //         complete: false
    //     });
    //     this.emit('change');
    // },
    // onToggleTodo: function(payload) {
    //     payload.todo.complete = !payload.todo.complete;
    //     this.emit('change');
    // },
    // onClearTodos: function() {
    //     this.todos = this.todos.filter(function(todo) {
    //         return !todo.complete;
    //     });
    //     this.emit('change');
    // },
    getState: function() {
        return {
            comments: this.comments
        };
    }
});
