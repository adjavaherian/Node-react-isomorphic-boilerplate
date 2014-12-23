var React = require('react');

var CommentBox = require('../modules/CommentBox');


module.exports = CommentsPage = React.createClass({
    displayName: 'CommentsPage',
    render: function() {
        return (
            React.DOM.div({
                    className: 'CommentsPage'
                },
                React.DOM.h2({
                        className: 'class-name-h2'
                    },
                    'Welcome to the Comment\'s Page.'
                ),
                React.DOM.p({
                        className: 'class-p'
                    },
                    '`CommentsPage` (like all pages) is a component made up of other Components like `CommentList`, `CommentForm`. `CommentList` is made up of `Comments`. '
                ),
                React.DOM.p({
                        className: 'class-name-p'
                    },
                    'The `CommentList` is set to fetch (in 10s interval) an array of comment json objects from a static comments.json file on the server. It will fetch and render every 10 seconds. When you post a new comment it is displayed on the page - but it is not processed on the server (im too lazy). Hence every 10 seconds or so the CommentList will be regenerated from comments.json'
                ),
                React.createElement(CommentBox, {
                    initialState: this.props.initialState,
                    url: 'comments.json',
                    pollInterval: 10000
                })
            )
        );
    }
});
