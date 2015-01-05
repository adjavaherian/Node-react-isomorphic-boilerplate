var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = TodoPage = React.createClass({
    displayName: 'TodoPage',
    mixins: [FluxMixin, StoreWatchMixin('TodoStore')],

    getInitialState: function() {
        return {
            newTodoText: ''
        };
    },

    getStateFromFlux: function() {
        var flux = this.getFlux();
        // Our entire state is made up of the TodoStore data. In a larger
        // application, you will likely return data from multiple stores, e.g.:
        //
        //   return {
        //     todoData: flux.store('TodoStore').getState(),
        //     userData: flux.store('UserStore').getData(),
        //     fooBarData: flux.store('FooBarStore').someMoreData()
        //   };
        return flux.store('TodoStore').getState();
    },

    render: function() {
        // you can do stuff here!
        // console.log 'rendered!');
        return (
            React.DOM.div({
                    className: 'div'
                },
                React.DOM.ul({
                        className: 'test'
                    },
                    this.state.todos.map(
                        function(todo, i) {
                            return (
                                React.DOM.li({
                                        key: i
                                    },
                                    React.createElement('div', {
                                        todo: todo, // you can pass any particular data to this component!

                                        // bad practice, dont change the data directly!!!
                                        // onClick: function() {
                                        //      console.log('toggled from ' + JSON.stringify(todo) + ' to ' + !todo.complete)
                                        //      todo.complete = !todo.complete;
                                        // }


                                        // instead, call the dispatcher:
                                        // since we are in a state.todos.map, this.getFlux() is not available. this refers to something else!
                                        // onClick: this.getFlux().actions.toggleTodo(todo).bind(this, todo);
                                        onClick: function(todo) {
                                            this.getFlux().actions.toggleTodo(todo);
                                        }.bind(this, todo)

                                    }, todo.text + ' | ' + todo.complete)
                                )
                            );
                        }, this) //end this.state.todos.map
                ),
                React.DOM.form({
                        // onSubmit: this.onSubmitForm
                    },
                    React.DOM.input({
                        type: 'text',
                        size: '30',
                        placeholder: 'New Todo',
                        value: this.state.newTodoText,
                        onChange: this.handleTodoTextChange
                    }),
                    React.DOM.input({
                        type: 'submit',
                        onClick: this.onSubmitForm,
                        value: 'Add Todo'
                    })
                ),
                React.DOM.button({
                    onClick: this.clearCompletedTodos
                }, 'Clear completed')
            )
        );
    },

    handleTodoTextChange: function(e) {
        this.setState({
            newTodoText: e.target.value
        });
    },

    onSubmitForm: function(e) {
        e.preventDefault();
        if (this.state.newTodoText.trim()) {
            this.getFlux().actions.addTodo(this.state.newTodoText);
            this.setState({
                newTodoText: ''
            });
        }
    },

    clearCompletedTodos: function(e) {
        this.getFlux().actions.clearTodos();
    }
});
