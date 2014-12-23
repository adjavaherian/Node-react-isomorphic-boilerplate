var React = require('react');
var Router = require('react-router-component');
var Link = Router.Link;


module.exports = HeaderNav = React.createClass({
    displayName: 'HeaderNav',
    render: function() {
        return (
            React.DOM.div({
                    className: 'HeaderNav'
                },
                React.createElement(Link, {
                    href: "/"
                }, 'Frontpage!'),
                React.createElement(Link, {
                    href: "/1"
                }, 'Go to page 1'),
                React.createElement(Link, {
                    href: "/2"
                }, 'Go to page 2'),
                React.createElement(Link, {
                    href: "/mapsearchpage"
                }, 'Map search now!'),
                React.createElement(Link, {
                    href: "/comments-page"
                }, 'Go to page comments-page'),
                React.createElement(Link, {
                    href: "/404"
                }, 'Go to page not found')
            )
        );
    }
});
