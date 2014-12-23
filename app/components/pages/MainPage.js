var React = require('react');


module.exports = MainPage = React.createClass({
    displayName: 'MainPage',
    render: function() {
        return (
            React.DOM.div({
                    className: 'MainPage'
                },
                React.DOM.h2({
                        className: 'class-name-h2'
                    },
                    'Main page!!'
                ),
                React.DOM.p({
                        className: 'class-name-p'
                    },
                    'MainPage paragraph thingy'
                ),
                this.props.children
            )
        );
    }
});
