// dispatcher actions, includes actions for ALL stores.
var constants = require('./constants');

var actions = {
    // this is just a list of the actions.
    // the actions are dispatched with their payload to all the stores
    // if the store binds it to one of its function, that function will run.
    addTodo: function(text) {
        this.dispatch(constants.ADD_TODO, {
            text: text
        });
    },
    toggleTodo: function(todo) {
        this.dispatch(constants.TOGGLE_TODO, {
            todo: todo
        });
    },

    clearTodos: function() {
        this.dispatch(constants.CLEAR_TODOS);
    }
};

module.exports = actions;
