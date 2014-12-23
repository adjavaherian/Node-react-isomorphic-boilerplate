var config = require('../config');
var React = require('react');
var $ = require('jquery');
var url = require('url');

var Router = require('react-router-component');
var Link = Router.Link;
var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;

var HeaderNav = require('./components/modules/HeaderNav'); // this would normally be loaded in by the page
// Load all pages
var FrontPage = require('./components/pages/FrontPage');
var MapSearchPage = require('./components/pages/MapSearchPage');
var IsoBegins = require('./components/pages/IsoBegins');
var IsoBegins2 = require('./components/pages/IsoBegins2');
var NotFoundPage = require('./components/pages/NotFound');
var CommentsPage = require('./components/pages/CommentsPage');


if (typeof window !== 'undefined') {
    // trigger render to bind UI to application on front end
    window.onload = function() {
        console.log('CLIENT-ONLY CODE; re-render on load to initialize UI elements and all')
        var path = url.parse(document.URL).pathname;
        console.log('CLIENT path: ' + path)
        var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);
        // pass initial state into app on client side render
        React.render(React.createElement(App, {
            path: path,
            initialState: initialState
        }), document);
    };
}

var App = React.createClass({
    displayName: 'App',
    render: function() {
        if (typeof window !== 'undefined') {
            console.log('CLIENT')
        } else {
            console.log('SERVERSIDE')
        }
        return (
            React.createElement('html', null,
                React.createElement('head', {
                        lang: 'en'
                    },
                    React.createElement('meta', {
                        charSet: 'UTF-8'
                    }),
                    React.createElement('title', null, 'React App'),
                    React.createElement('link', {
                        rel: 'stylesheet',
                        href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css'
                    })
                ),
                React.createElement('body', null,
                    React.createElement(HeaderNav, {
                        path: this.props.path
                    }),
                    // Locations component handles like a switch case, 
                    // if the current path matches the path of a child, it renders that element. simple. 
                    React.createElement(Locations, {
                            path: this.props.path,
                        },
                        React.createElement(Location, {
                            path: "/",
                            initialState: this.props.initialState,
                            handler: FrontPage
                        }),
                        React.createElement(Location, {
                            path: "/mapsearchpage",
                            initialState: this.props.initialState,
                            handler: MapSearchPage
                        }),
                        React.createElement(Location, {
                            path: "/comments-page",
                            initialState: this.props.initialState,
                            handler: CommentsPage
                        }),
                        React.createElement(Location, {
                            path: "/1",
                            handler: IsoBegins
                        }),
                        React.createElement(Location, {
                            path: "/2",
                            handler: IsoBegins2
                        }),
                        React.createElement(NotFound, {
                            handler: NotFoundPage

                        })
                    ),
                    React.createElement('script', {
                        type: 'text/javascript',
                        src: '/public/dist/bundle.js'
                    })
                )
            )
        )
    }
});

module.exports = App;
