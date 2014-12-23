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
                    'Commentspage page!!'
                ),
                React.DOM.p({
                        className: 'class-name-p'
                    },
                    'CommentsPage paragraph thingy'
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
