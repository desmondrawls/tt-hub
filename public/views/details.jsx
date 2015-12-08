var React = require('react')
var _ = require('lodash')
var attributesHelper = require('./collectionJsonHelpers/attributes.js')

var Details = React.createClass({
    render: function(){
        var context = this

        function attributesList(attributes){
            return _.map(attributes, function(attribute){
                return(
                    <span>
                        <dt>{attributesHelper.getPrompt(attribute)}</dt>
                        { context.props.edit ?
                            <dd>
                                <input
                                    type="text"
                                    name={attributesHelper.getName(attribute)}
                                    defaultValue={attributesHelper.getValue(attribute)}
                                    onChange={context.props.onChange}
                                />
                            </dd> :
                            <dd>{attributesHelper.getValue(attribute)}</dd>
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