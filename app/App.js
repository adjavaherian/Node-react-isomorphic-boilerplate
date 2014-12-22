var config = require('../config');
var React = require('react');
var $ = require('jquery');

// var CommentBox = React.createFactory(require('./components/CommentBox'));
var CommentBox = require('./components/CommentBox');

var IsoBegins = React.createFactory(require('./components/IsoBegins'));

if (typeof window !== 'undefined') {
    // trigger render to bind UI to application on front end
    window.onload = function() {
        console.log('CLIENT-ONLY CODE; re-render on load to initialize UI elements and all')
        var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);
        // pass initial state into app on client side render
        React.render(React.createElement(App, {
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
                        href: '/stylesheets/style.css'
                    })
                ),
                React.createElement('body', null,
                    React.createElement('div', {
                            id: 'main'
                        },
                        React.createElement('div', {
                                id: 'content'
                            },
                            'Information and stuff'),
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
