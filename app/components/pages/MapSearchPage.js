var React = require('react');


module.exports = MapSearchPage = React.createClass({
    displayName: 'MapSearchPage',
    render: function() {
        return (
            React.DOM.div({
                    className: 'MapSearchPage'
                },
                React.DOM.h2({
                        className: 'class-name-h2'
                    },
                    'Main page!!'
                ),
                React.DOM.p({
                        className: 'class-name-p'
                    },
                    'MapSearchPage paragraph thingy'
                ),
                this.props.children
            )
        );
    }
});
