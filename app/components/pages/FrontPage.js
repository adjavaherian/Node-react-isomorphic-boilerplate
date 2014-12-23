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
                    'Welcome to Hotpads. The place to find your place.'
                ),
                React.DOM.p({
                        className: 'class-name-p'
                    },
                    'This is the frontpage (aka home page) of the app. Try clicking the links above to experience the site!'
                ),
                this.props.children
            )
        );
    }
});
