var config = require('../config');
var React = require('react');
var $ = require('jquery');
var url = require('url');

var Router = require('react-router-component');
var Link = Router.Link;
var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;

var HeaderNav = require('./modules/HeaderNav'); // this would normally be loaded in by the page
// Load all pages
var FrontPage = require('./pages/FrontPage');
var MapSearchPage = require('./pages/MapSearchPage');
var IsoBegins = require('./pages/IsoBegins');
var IsoBegins2 = require('./pages/IsoBegins2');
var NotFoundPage = require('./pages/NotFound');
var CommentsPage = require('./pages/CommentsPage');
var Fluxxor = require('fluxxor');
var constants = require('./constants');
var TodoStore = require('./stores/TodoStore');
var actions = require('./actions');

if (typeof window !== 'undefined') {
    // trigger render to bind UI to application on front end
    window.onload = function() {
        console.log('CLIENT-ONLY CODE; re-render on load to initialize UI elements and all')
        var path = url.parse(document.URL).pathname;
        console.log('CLIENT path: ' + path) // ONLY COMPONENTS ON THIS PAGE SHOULD RECEIVE INITIAL STATE DATA
        // var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

        var stores = {
            TodoStore: new TodoStore()
        };

        var flux = new Fluxxor.Flux(stores, actions);
        flux.on("dispatch", function(type, payload) {
            if (console && console.log) {
                console.log("[CLIENT Dispatch]", type, payload);
            }
        });

        // re-render on client side with same information to bind UI actions!
        React.render(React.createElement(App, {
            flux: flux,
            path: path
            // initialState: initialState // ONLY COMPONENTS ON THIS PATH SHOULD RECEIVE INITIAL STATE DATA
        }), document.body);
    };
}


// FLUXXOR EXAMPLE TODO LIST
var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var App = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("TodoStore")],

    getInitialState: function() {
        return {
            newTodoText: ""
        };
    },

    getStateFromFlux: function() {
        var flux = this.getFlux();
        // Our entire state is made up of the TodoStore data. In a larger
        // application, you will likely return data from multiple stores, e.g.:
        //
        //   return {
        //     todoData: flux.store("TodoStore").getState(),
        //     userData: flux.store("UserStore").getData(),
        //     fooBarData: flux.store("FooBarStore").someMoreData()
        //   };
        return flux.store("TodoStore").getState();
    },

    render: function() {
        return (
            React.DOM.div({
                    className: "div"
                },
                React.DOM.ul({
                        className: "test"
                    },
                    this.state.todos.map(function(todo, i) {
                        return (
                            React.DOM.li({
                                    key: i
                                },
                                React.createElement("div", {
                                    todo: todo // you can pass any particular data to this component!
                                }, todo.text + " | " + todo.complete)
                            )
                        )
                    })
                ),
                React.DOM.form({
                        onSubmit: this.onSubmitForm
                    },
                    React.DOM.input({
                        type: "text",
                        size: "30",
                        placeholder: "New Todo",
                        value: this.state.newTodoText,
                        onChange: this.handleTodoTextChange
                    }),
                    React.DOM.input({
                        type: "submit",
                        value: "Add Todo",
                    })
                ),
                React.DOM.button({
                    onClick: this.clearCompletedTodos
                }, "Clear completed")
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
                newTodoText: ""
            });
        }
    },

    clearCompletedTodos: function(e) {
        this.getFlux().actions.clearTodos();
    }
});


var App = App;

// React.createClass({
//     displayName: 'App',
//     render: function() {
//         if (typeof window !== 'undefined') {
//             // console.log('App: client')
//         } else {
//             // console.log('App: serverside')
//         }
//         return (
//             React.createElement('html', null,
//                 React.createElement('head', {
//                         lang: 'en'
//                     },
//                     React.createElement('meta', {
//                         charSet: 'UTF-8'
//                     }),
//                     React.createElement('title', null, 'React App'),
//                     React.createElement('link', {
//                         rel: 'stylesheet',
//                         href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css'
//                     })
//                 ),
//                 React.createElement('body', null,
//                     React.createElement('p', {
//                         className: 'envType'
//                     }, 'ISOMORPHIC WEB APP --  Navigating to any page url directly (or hitting refresh) will serve it up with server-side rendering. After the initial load, all subsequent page loads are client rendered. The coolest part about it is that you resuse the same components/code on the server and client! Super efficient and scalable for a big team. #yay'),
//                     React.createElement('a', {
//                         href: '/server/frontpage'
//                     }, 'Click to go to the server-side ONLY rendering application (/server/* for example /server/frontpage)'),
//                     React.createElement(HeaderNav, {
//                         path: this.props.path
//                     }),
//                     // Locations component handles like a switch case, 
//                     // if the current path matches the path of a child, it renders that element. simple. 
//                     React.createElement(Locations, {
//                             path: this.props.path,
//                         },
//                         React.createElement(Location, {
//                             path: "/",
//                             initialState: this.props.initialState, // needs something like if path == serverside loaded path, pass in initialState
//                             handler: FrontPage
//                         }),
//                         React.createElement(Location, {
//                             path: "/mapsearchpage",
//                             initialState: this.props.initialState,
//                             handler: MapSearchPage
//                         }),
//                         React.createElement(Location, {
//                             path: "/comments-page",
//                             initialState: this.props.initialState,
//                             handler: CommentsPage
//                         }),
//                         React.createElement(Location, {
//                             path: "/1",
//                             handler: IsoBegins
//                         }),
//                         React.createElement(Location, {
//                             path: "/2",
//                             handler: IsoBegins2
//                         }),
//                         React.createElement(NotFound, {
//                             handler: NotFoundPage

//                         })
//                     ),
//                     React.createElement('script', {
//                         type: 'text/javascript',
//                         src: '/public/dist/bundle.js'
//                     })
//                 )
//             )
//         )
//     }
// });

module.exports = App;
