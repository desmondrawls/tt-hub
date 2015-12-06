var React = require('react')

var Page = React.createClass({
    render: function(){
        return (
            <html>
                <head>
                    <title>TechTalk</title>
                    <link rel='stylesheet' type='text/css' href='/stylesheets/main.css'/>
                </head>
                <body>
                    {this.props.children}
                </body>
            </html>
        )
    }
})

module.exports = Page