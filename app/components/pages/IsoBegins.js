var React = require('react');

module.exports = IsoBegins = React.createClass({
    displayName: 'IsoBegins',
    render: function() {
        return (
            React.createElement('h1', {
                    className: 'isoBegins'
                },
                'HELLO WORLD. NOW WE ARE GETTING THERE'
            )
        );
    }
});
