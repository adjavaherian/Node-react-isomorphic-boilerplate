var React = require('react');

module.exports = NotFound = React.createClass({
    displayName: 'NotFound',
    render: function() {
        return (
            React.createElement('h1', {
                    className: 'notFound'
                },
                '404 error! page not found'
            )
        );
    }
});
