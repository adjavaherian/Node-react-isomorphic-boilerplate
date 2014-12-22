var React = require('react');
var Comment = require('./Comment');


module.exports = CommentList = React.createClass({
    displayName: 'CommentList',
    render: function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                React.createElement(Comment, {
                    key: comment.id,
                    author: comment.author,
                    text: comment.text
                })
            );
        });
        return (
            React.createElement('div', {
                    className: 'commentList'
                },
                commentNodes
            )
        );
    }
});
