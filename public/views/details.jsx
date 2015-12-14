var React = require('react')
var _ = require('lodash')
var attributesHelper = require('./../../helpers/collectionJson/attributes.js')

var Details = React.createClass({
    render: function(){
        var context = this

        function attributesList(attributes){
            return _.map(attributes, function(attribute){
                return(
                    <span>
                        <dt>{attributesHelper.getAttributePrompt(attribute)}</dt>
                        { context.props.edit ?
                            <dd>
                                <input
                                    type="text"
                                    name={attributesHelper.getAttributeName(attribute)}
                                    defaultValue={attributesHelper.getAttributeValue(attribute)}
                                    onChange={context.props.onChange}
                                />
                            </dd> :
                            <dd>{attributesHelper.getAttributeValue(attribute)}</dd>
                        }
                        <br/>
                    </span>
                )
            })
        }

        return (
            <dl>{attributesList(this.props.attributes)}</dl>
        )
    }
})

module.exports = Details