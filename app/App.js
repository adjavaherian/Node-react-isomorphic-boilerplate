var config = require('../config');
var React = require('react');
var Router = require('react-router-component');
var $ = require('jquery');
var url = require('url');

// var CommentBox = React.createFactory(require('./components/CommentBox'));
var CommentBox = require('./components/CommentBox');


var IsoBegins = require('./components/IsoBegins');
var IsoBegins2 = require('./components/IsoBegins2');
var NotFoundPage = require('./components/NotFound');

var Link = Router.Link;
var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;

var MainPage = require('./components/pages/MainPage');

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
                    }),
                    React.createElement(Locations, {
                            path: this.props.path
                        },
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
                    )
                ),
                React.createElement('body', null,
                    React.createElement('div', {
                            className: 'container',
                            id: 'main'
                        },
                        React.createElement('div', {
                                id: 'content'
                            },
                            'Information and stuff',
                            React.createElement(Link, {
                                href: "/1"
                            }, 'Go to page 1'),
                            React.createElement(Link, {
                                href: "/2"
                            }, 'Go to page 2'),
                            React.createElement(Link, {
                                href: "/404"
                            }, 'Go to page not found')
                        ),
                        React.createElement(CommentBox, {
                            initialState: this.props.initialState,
                            url: 'comments.json',
                            pollInterval: 2000
                        })
                        // ),
                        // React.createElement('script', {
                        //         type: 'text/json',
                        //         id: 'initial-state'
                        //     },
                        //     this.props.initialState
                    ), React.createElement('script', {
                        type: 'text/javascript',
                        src: '/public/dist/bundle.js'
                    })
                )
            )
        )
    }
});

module.exports = App;
