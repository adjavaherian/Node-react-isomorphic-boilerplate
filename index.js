var express = require('express');
var path = require('path');
var app = express();
var config = require('./config');
var serveStatic = require('serve-static');
var React = require('react');
var url = require('url');
var request = require('request');

app.use(express.static(path.join(__dirname, '/')));
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
//
//
//
var App = require('./app/App.js');
var Fluxxor = require('fluxxor');
var constants = require('./app/constants');
var actions = require('./app/actions');
var TodoStore = require('./app/stores/TodoStore');
var CommentStore = require('./app/stores/CommentStore');

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

    var path = url.parse(req.url).pathname;
    console.log('ISO SERVER path: ' + path);
    // we need to send all the stores the application will use
    // however, only the one relevant to the path should be populated?
    var stores = {
        CommentStore: new CommentStore(),
        TodoStore: new TodoStore()
    };

    var flux = new Fluxxor.Flux(stores, actions);
    // dispatcher on server is static; it will never be called. we just use it on
    // the server to render the necessary content!
    // flux.on("dispatch", function(type, payload) {
    // if (console && console.log) {
    // console.log("[SERVER Dispatch]", type, payload);
    // }
    // });

    var AppElement = React.createElement(App, {
        flux: flux,
        path: path
            // initialState: initialState
    });

    var markup = React.renderToString(AppElement);
    // var markup = "";
    // markup += '<script id="initial-state" type="application/json">' + JSON.stringify(flux) + '</script>';
    // markup += '<script type="text/javascript" src="/public/dist/bundle.js"></script>';
    res.send(markup);

});

app.listen(config.app.port);
console.log('Server listening on port ' + config.app.port);

process.on('uncaughtException', function(err) {
    console.log('ERR:' + err);
    process.exit(1);
});
