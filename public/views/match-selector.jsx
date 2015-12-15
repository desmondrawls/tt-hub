var React = require('react')
var _ = require('lodash')
var templateHelper = require('../../collectionJsonHelpers/extractors/template.js')

var MatchSelector = React.createClass({
    render: function(){
        var context = this
        function selections(){
            return _.map(templateHelper.getData(context.props.template), function(selection){
                return <span className="talk-selection">{selection.value}</span>
            })
        }
        return(
            <div className="talk-selector">
                <button className="talk-selector-button" onClick={this.onClick}>SCHEDULE!</button>
                {selections()}
            </div>
        )
    },

    onClick: function(){
        var context = this
        $.ajax(context.props.href, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            data: {'template': context.props.template},
            success: function(molecule){
                console.log("MADE A TECH TALK:", molecule)
            }
        })
    },
})

module.exports = MatchSelector