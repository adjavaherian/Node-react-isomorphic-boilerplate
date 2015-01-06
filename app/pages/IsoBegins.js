var React = require('react');

module.exports = IsoBegins = React.createClass({
    displayName: 'IsoBegins',
    render: function() {
        return (
            React.createElement('h1', {
                    className: 'isoBegins'
                },
                'You are now on page 1.',
                React.createElement('p', {
                    className: 'testing'
                }, 'Page 1 is a static page showing this plain text.')
            )
        );
    }
});
