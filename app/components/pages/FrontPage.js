var React = require('react');


module.exports = FrontPage = React.createClass({
    displayName: 'FrontPage',
    render: function() {
        return (
            React.DOM.div({
                    className: 'FrontPage'
                },
                React.DOM.h2({
                        className: 'class-name-h2'
                    },
                    'FrontPage page!! Welcome to Hotpads.'
                ),
                React.DOM.p({
                        className: 'class-name-p'
                    },
                    'FrontPage paragraph thingy'
                ),
                this.props.children
            )
        );
    }
});
