var React = require('react')
var _ = require('lodash')

var MatchSelector = React.createClass({
    render: function(){
        var context = this
        function selections(){
            return _.map(context.props.templateInputs, function(selection){
                return <span className="talk-selection">{selection.value}</span>
            })
        }
        return(
            <div className="talk-selector">
                {selections()}
            </div>
        )
    }
})

module.exports = MatchSelector