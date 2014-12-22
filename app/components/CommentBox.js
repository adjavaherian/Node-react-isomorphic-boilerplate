var React = require('react');
var request = require('request');
var CommentForm = require('./CommentForm');
var CommentList = require('./CommentList');

// var browser;
// if (typeof window !== 'undefined') {
//     browser = true;
// }

// var data = [];
// if (!browser) {
//     data = require('../../comments.json');
// }


module.exports = CommentBox = React.createClass({
    displayName: 'CommentBox',
    loadCommentsFromServer: function() {
        var self = this;
        request('http://localhost:3000/' + this.props.url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                self.setState({ // calling this.setState() will cause react to re-render the component
                    data: JSON.parse(body)
                });
            }
        })
    },
    handleCommentSubmit: function(comment) {
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({
            data: newComments
        });
        // request.post('/comment', {form:{key:'value'}})
        // $.ajax({
        //     url: '/comment',
        //     type: 'POST',
        //     data: comment,
        //     success: function(data) {
        //         this.setState({
        //             data: data
        //         });
        //     }.bind(this),
        //     error: function(xhr, status, err) {
        //         console.error('/comment', status, err.toString());
        //     }.bind(this)
        // });
    },
    getInitialState: function() { //called automatically once, executes once only
        // THIS wont work.... 
        // request('http://localhost:3000/comments.json', function(error, response, body) {
        //         return {
        //             data: body
        //         };
        //     })
        // console.log(JSON.stringify(this.props));
        return {
            data: this.props.initialState //this.state.data is initialized by the server if being called from the server??
        };
    },
    componentDidMount: function() { // called automatically when the component is mounted
        this.loadCommentsFromServer(); // client side stuff; we do getInitialState on the server!
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
