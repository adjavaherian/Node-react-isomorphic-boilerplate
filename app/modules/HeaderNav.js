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
                    className: "btn btn-default",
                    href: "/"
                }, 'Frontpage!'),
                React.createElement(Link, {
                    className: "btn btn-default",
                    href: "/todo"
                }, '...TODO APP...!'),
                React.createElement(Link, {
                    className: "btn btn-default",
                    href: "/1"
                }, 'Go to page 1'),
                React.createElement(Link, {
                    className: "btn btn-default",
                    href: "/2"
                }, 'Go to page 2'),
                React.createElement(Link, {
                    className: "btn btn-default",
                    href: "/mapsearchpage"
                }, 'Map search now!'),
                React.createElement(Link, {
                    className: "btn btn-default",
                    href: "/comments-page"
                }, 'Go to page comments-page'),
                React.createElement(Link, {
                    className: "btn btn-default",
                    href: "/404"
                }, 'Go to page not found')
            )
        );
    }
});
