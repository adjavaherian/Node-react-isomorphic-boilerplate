var React = require('react');


module.exports = Comment = React.createClass({
    displayName: 'Comment',
    render: function() {
        return (
            React.DOM.div({
                    className: 'comment'
                },
                React.DOM.h2({
                        className: 'commentAuthor'
                    },
                    this.props.author
                ),
                React.DOM.p({
                        className: 'commentText'
                    },
                    this.props.text
                ),
                this.props.children
            )
        );
    }
});
