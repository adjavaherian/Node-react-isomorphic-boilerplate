var React = require('react');

module.exports = CommentForm = React.createClass({
    displayName: 'CommentForm',
    handleSubmit: function(e) {
        e.preventDefault();
        var author = this.refs.author.getDOMNode().value.trim();
        var text = this.refs.text.getDOMNode().value.trim();
        if (!text || !author) {
            return;
        }
        var comment = {
            author: author,
            text: text
        }
        this.props.onCommentSubmit(comment); // CALL a function that was passed from COMMENT BOX
        this.refs.author.getDOMNode().value = '';
        this.refs.text.getDOMNode().value = '';
        return;
    },
    render: function() {
        return React.createElement('form', {
                className: 'commentForm',
                onSubmit: this.handleSubmit // LINK AN EVENT TO A JS FUNCTION ABOVE
            },
            React.createElement('input', {
                type: 'text',
                placeholder: 'Your name',
                ref: 'author'
            }),
            React.createElement('input', {
                type: 'text',
                placeholder: 'Say something...',
                ref: 'text'
            }),
            React.createElement('input', {
                type: 'submit',
                value: 'Post'
            })
        );
    }
});
