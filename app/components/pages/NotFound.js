var React = require('react');

module.exports = NotFound = React.createClass({
    displayName: 'NotFound',
    render: function() {
        return (
            React.createElement('div', {
                    className: 'notFoundWrapper'
                },
                React.createElement('h1', {
                        className: 'notFound'
                    },
                    '404 error! page not found.'
                ),
                React.createElement('p', {
                        className: 'notFound'
                    },
                    'feel free to type anything in the url. most likely you\'ll end up here. (`/server/*` --> ssr vs `/*` --> iso)')
            )
        );
    }
});
