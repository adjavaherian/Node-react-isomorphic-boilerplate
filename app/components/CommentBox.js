var React = require('react');
var $ = require('jquery');

module.exports = CommentBox = React.createClass({
    displayName: 'CommentBox',
    loadCommentsFromServer: function() {
        $.ajax({
            url: this.props.url, //props got passed in when we create an element from this class
            dataType: 'json',
            success: function(data) {
                this.setState({ // calling this.setState() will cause react to re-render the component
                    data: data
                });
            }.bind(this), // must bind this to get the current element! otherwise it would be the request/response? whatever ajax defaults this to.
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleCommentSubmit: function(comment) {
        console.log('THIS COMMENT HAS BEEN SUBMITTED: ' + comment);
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({
            data: newComments
        });
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function(data) {
                this.setState({
                    data: data
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() { //called automatically once, executes once only
        return {
            data: [] //this.state.data is initialized to empty
        };
    },
    componentDidMount: function() { // called automatically when the component is mounted
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
        return React.DOM.div({
                className: 'commentBox' // this is literally the html class name
            },
            React.DOM.h1(null, 'Here is the CommentList:'), // (attr, content) -- you can nest elements in there, but the idea is to create components for anything that requires nesting!!
            React.createElement(CommentList, { // create a CommentList element and pass it the data
                data: this.state.data //pass the Box's state in to the List as a prop.
            }),
            React.DOM.h1(null, 'Here is the CommentForm:'),
            React.createElement(CommentForm, {
                onCommentSubmit: this.handleCommentSubmit // pass the function this.handleCommentSubmit to the Form Component as props.onCommentSubmit
            })
        );
    }
});
