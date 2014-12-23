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
                    'When you want to search for an apartment on Hotpads, we have this awesome map-based search application. So you go to a page and there is a big map. When you click on an apartment, you dont lose your map view! Instead, we pop out some information on the right side of the screen. You can see the apartments location and details at the same time!!! #likeaboss'
                )
                // this.props
            )
        );
    }
});
