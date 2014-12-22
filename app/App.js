var config = require('../config');
var React = require('react');
var $ = require('jquery');

// var Components = require('require-all')(config.root + '/app/components'); -- not supported in browser
var Comment = require('./components/Comment');
var CommentBox = require('./components/CommentBox');
var CommentForm = require('./components/CommentForm');
var CommentList = require('./components/CommentList');
var IsoBegins = require('./components/IsoBegins');

if (typeof window !== 'undefined') {
	// trigger render to bind UI to application on front end
    window.onload = function() {
        React.render(App(), document);
    }
}

var Components = {
    Comment: Comment,
    CommentBox: CommentBox,
    CommentForm: CommentForm,
    CommentList: CommentList,
    IsoBegins: IsoBegins
}

var App = React.createClass({
    displayName: "App",
    render: function() {
        return (
            React.createElement("html", null,
                React.createElement("head", {
                        lang: "en"
                    },
                    React.createElement("meta", {
                        charSet: "UTF-8"
                    }),
                    React.createElement("title", null, "React App"),
                    React.createElement("link", {
                        rel: "stylesheet",
                        href: "/stylesheets/style.css"
                    })
                ),
                React.createElement("body", null,
                    React.createElement("div", {
                            id: "main"
                        },
                        React.createElement(CommentBox, {
                            url: 'comments.json',
                            pollInterval: 2000
                        })
                    ),
                    React.createElement("script", {
                        type: "text/javascript",
                        src: "/public/dist/bundle.js"
                    })
                )
            )
        )
    }
});

module.exports = App;
