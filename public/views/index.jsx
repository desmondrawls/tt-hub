var React = require('react')
var Page = require('./page.jsx')
var NewForm = require('./new.jsx')
var Link = require('./link.jsx')
var _ = require('lodash')
var templateHelper = require('./../../helpers/collectionJson/template.js')
var itemsHelper = require('./../../helpers/collectionJson/items.js')
var speakersHelper = require('./../../helpers/speakers.js')

var Index = React.createClass({
    getInitialState: function () {
        return {
            speakersObject: this.props.speakersObject,
            adding: false
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
                { this.state.adding ?
                    <NewForm
                        onCreate={this.onCreate}
                        onCancel={this.onCancel}
                        template={templateHelper.getTemplate(this.props.speakersObject)}
                        href={this.state.speakersObject.collection.href}/>
                : <Link onClick={context.onNew} text="New"/> }
            </Page>
        )
    },

    onCreate: function(speakersObject){
        this.setState({speakersObject: speakersObject})
    },

    onNew: function(){
        this.setState({adding: true})
    },

    onCancel: function(){
        this.setState({adding: false})
    }
})

module.exports = Index