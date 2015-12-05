var React = require('react')

var Page = React.createClass({
    render: function(){
        return (
            <html>
                <head>
                    <title>TechTalk</title>
                </head>
                <body>
                    {this.props.children}
                </body>
            </html>
        )
    }
})

module.exports = Page