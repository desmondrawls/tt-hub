var React = require('react')
var Page = require('./page.jsx')
var _ = require('lodash')

var Show = React.createClass({
    render: function(){
        function profile(attributes){
            return _.map(attributes, function(attribute){
                return(
                    <span>
                        <dt>{attribute.prompt}</dt>
                        <dd className='view'>{attribute.value}</dd>
                        <dd className='edit'></dd>
                        <br/>
                    </span>
                )
            })
        }
        return (
            <Page {...this.props}>
                <h1>Speaker</h1>
                <dl>{profile(this.props.attributes)}</dl>
            </Page>
        )
    }
})

module.exports = Show