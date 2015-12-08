var React = require('react')
var _ = require('lodash')

var Details = React.createClass({
    render: function(){
        var context = this

        function attributesList(attributes){
            return _.map(attributes, function(attribute){
                return(
                    <span>
                        <dt>{attribute.prompt}</dt>
                        { context.props.edit ?
                            <dd><input type="text" name={attribute.name} defaultValue={attribute.value} onChange={context.props.onChange}/></dd> :
                            <dd>{attribute.value}</dd>
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