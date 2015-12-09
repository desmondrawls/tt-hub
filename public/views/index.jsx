var React = require('react')
var Page = require('./page.jsx')
var _ = require('lodash')
var itemsHelper = require('./helpers/collectionJson/items.js')
var speakersHelper = require('./helpers/speakers.js')

var Index = React.createClass({
    getInitialState: function () {
        return {
            speakersObject: this.props.speakersObject,
        }
    },

    render: function () {
        var context = this

        function speakers(speakers) {
            return _.map(speakers, function (speaker) {
                return (
                    <li>
                        <a href={speakersHelper.getLink(speaker)}>{speakersHelper.getFullName(speaker)}</a>
                    </li>
                )
            })
        }

        return (
            <Page {...this.props}>
                <h1>TechTalk</h1>
                <h3>Speakers</h3>
                <ul>
                    {speakers(itemsHelper.getItems(this.state.speakersObject))}
                </ul>
            </Page>
        )
    }
})

module.exports = Index