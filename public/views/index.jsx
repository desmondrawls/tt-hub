var React = require('react')
var Page = require('./page.jsx')
var _ = require('lodash')

var Index = React.createClass({
    render: function(){
        function speakers(speakers) {
            return _.map(speakers, function(speaker) {
                return (
                    <li>{speaker}</li>
                )
            })
        }
        return (
            <Page {...this.props}>
                <h1>TechTalk</h1>
                <h3>Speakers</h3>
                <ul>
                    {speakers(this.props.speakers)}
                </ul>
            </Page>
        )
    }
})

module.exports = Index