var express = require('express');
var path = require('path');
var app = express();
var config = require('./config');
var serveStatic = require('serve-static');
var React = require('react');
var url = require('url');
var request = require('request');

app.use(express.static(path.join(__dirname, '/')));
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

var App = require('./app/App.js');
var Fluxxor = require('fluxxor');


// app.route('/simple').get(function(req, res, next) {
// var data = [{
//     title: "Hello world",
//     awesomness: "super-high"
// }, {
//     title: "Hello world encore",
//     awesomness: "super-high"
// }]
// var reactElement = React.createElement(App.IsoBegins, {
//     data: data
// });
// var markup = React.renderToString(reactElement);
// res.send(markup);
// });


// wanna be api call to post a new comment and save to .json file
// app.route('/comment').post(function(req, res, next) {
// res.send('successfully recevied:' + JSON.stringify(req.body))
// fs.appendFile("./comments.json", JSON.stringify(req.body), function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("The file was saved!");
//     }
// });
// });

// server side rendering complete.
// var FrontPage = require('./app/pages/FrontPage.js');
// var MapSearchPage = require('./app/pages/MapSearchPage');
// var IsoBegins = require('./app/pages/IsoBegins');
// var IsoBegins2 = require('./app/pages/IsoBegins2');
// var NotFoundPage = require('./app/pages/NotFound');
// var CommentsPage = require('./app/pages/CommentsPage');

// app.route('/server/:path').get(function(req, res, next) {
//     var path = req.params.path;
//     console.log('SERVER SIDE RENDERING');
//     var markup = '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">';
//     markup += 'SERVER-SIDE RENDERING -- Every time you navigate a page the browser will make a full HTTP request (same as typing in the new url directly or hitting refresh).';
//     markup += '<div><a class="btn btn-default" href="/server/frontpage">Frontpage!</a><a class="btn btn-default" href="/server/1">Go to page 1</a><a class="btn btn-default" href="/server/2">Go to page 2</a><a class="btn btn-default" href="/server/mapsearchpage">Map search now!</a><a class="btn btn-default" href="/server/comments-page">Go to page comments-page</a><a class="btn btn-default" href="/server/404">Go to page not found</a></div>';
//     markup += '<div><p><a href="/">Click to go back to the isomorphic app! just get rid of `server` from your /server/* urls</a></p></div>';
//     if (path == 'frontpage') {
//         var reactElement = React.createElement(FrontPage, {});
//     } else if (path == '1') {
//         var reactElement = React.createElement(IsoBegins, {});
//     } else if (path == '2') {
//         var reactElement = React.createElement(IsoBegins2, {});
//     } else if (path == 'mapsearchpage') {
//         var reactElement = React.createElement(MapSearchPage, {});
//     } else if (path == 'comments-page') {
//         var initialState = [{
//             "id": "1",
//             "author": "Fede Torre",
//             "text": "This is the first comment on the l!!!ist."
//         }, {
//             "id": "2",
//             "author": "Jordan Walk",
//             "text": "Things come and go."
//         }, {
//             "id": "3",
//             "author": "Fede Torre",
//             "text": "Hello world, isomorphic javascript app world. "
//         }];
//         var reactElement = React.createElement(CommentsPage, {
//             path: path,
//             initialState: initialState
//         });
//     } else {
//         var reactElement = React.createElement(NotFoundPage, {});
//     }
//     markup += React.renderToString(reactElement);
//     res.send(markup);

// });


// TO VISUALIZE CLIENT SIDE RENDERING, UNCOMMENT THIS LINE AND REFRESH COMMENTS PAGE
// Could be made more smooth by adding placeholders/loading spinners
// Our Isomorphic app will experience this on page changes, but This is easier/better (when made smooth) than a full new http request
// app.route('/comments-page').get(function(req, res, next) {
//     var path = url.parse(req.url).pathname;
//     console.log('CLIENT-SIDE RENDERING path: ' + path); // load client then click on comments
//     var AppElement = React.createElement(App, {
//         path: 'comments-page',
//         initialState: [] // initialState is not passed (initial comments will be fetched from front-end)
//     });

//     var markup = React.renderToString(AppElement);
//     markup += '<script id="initial-state" type="application/json">[]</script>';
//     res.send(markup);
// });


app.route('/*').get(function(req, res, next) {
    // all requests will be routed through react app; both server and client side stuffs
    // this allows us to define routes in only 1 place, while being able to serverside and clientside render

    // May need to have path dependant initial states or something..... whatever we would want indexed should use an initialState
    // We will need to implement isomorphic flux to get initialStates always in sync
    // Flux is a pre-render architecture thing
    // We have a lot of nested components. Say 5 different components use `Comments`
    // If we make a change to a comment in one component, only that component would re-render -- the other 4 would be out of sync
    // Flux provides 2 layers above the component: Dispatcher and Stores
    // Dispatcher receives the data from the server
    // Stores are essentially models. Instead of sending unstructured data, we generate structured 'comments' in a CommentStore for use across all components
    // So these work together in a unidirectional way
    // When one of your 5 components changes a comment, instead of just re-rendering that component, it would send the action to the dispatcher
    // The dispatcher will get the new information from ther server
    // The dispatcher will send the infromation to the necessary Stores (or models)
    // When those Stores are updated, they will trigger all dependant Components to re-render
    // Hence you have one-way flow and your app is always consistent.

    // The tricky thing is that we need this flux architecture available on the server as well.
    // We will rely on the dispatcher to create our initialState, (perhaps initialState == a group of Stores)
    // The same dispatcher will handle data retrieval/posting aka api calls from the client
    // On response, recreate the stores
    // Any changed stores will update their corresponding components
    // -- This way you always have unidirectional flow and consistent information displayed

    // Every page rendered independently must server-side fetch the intialState for that 1st server render
    // ie bots will be able to crawl fine
    // But there is no need to load ALL the app data (every component's initalState) on first load.
    // --> SEO will work calling any page independently (it is rendered on the server with its initialState)
    // --> All subsequent fetches will be rendered client side (how is performance on this. fine, right? thats the whole advantage of clientside apps....; you still have to load the data but its not a new full http request)
    // In the react app, initialState should only be passed/used by the initally loaded component.

    request('http://localhost:3000/comments.json', function(error, response, body) {
        var path = url.parse(req.url).pathname;
        console.log('ISO SERVER path: ' + path);
        var initialState = JSON.parse(body);



        var constants = {
            ADD_TODO: "ADD_TODO",
            TOGGLE_TODO: "TOGGLE_TODO",
            CLEAR_TODOS: "CLEAR_TODOS"
        };

        var TodoStore = Fluxxor.createStore({
            initialize: function() {
                this.todos = [];
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
                this.emit("change");
            },
            onToggleTodo: function(payload) {
                payload.todo.complete = !payload.todo.complete;
                this.emit("change");
            },
            onClearTodos: function() {
                this.todos = this.todos.filter(function(todo) {
                    return !todo.complete;
                });
                this.emit("change");
            },
            getState: function() {
                return {
                    todos: this.todos
                };
            }
        });

        var actions = {
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

        var stores = {
            TodoStore: new TodoStore()
        };

        var flux = new Fluxxor.Flux(stores, actions);
        flux.on("dispatch", function(type, payload) {
            if (console && console.log) {
                console.log("[SERVER Dispatch]", type, payload);
            }
        });

        var AppElement = React.createElement(App, {
            flux: flux,
            path: path,
            initialState: initialState
        });
        // var markup = React.renderToString(AppElement);
        var markup = "";
        markup += '<script id="initial-state" type="application/json">' + JSON.stringify(initialState) + '</script>';
        markup += '<script type="text/javascript" src="/public/dist/bundle.js"></script>';
        res.send(markup);
    });

});







app.listen(config.app.port);
console.log('Server listening on port ' + config.app.port);

process.on('uncaughtException', function(err) {
    console.log('ERR:' + err);
    process.exit(1);
});
