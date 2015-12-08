var React = require('react')
var _ = require('lodash')

var FormButtons = React.createClass({
    render: function(){
        return (
            <div className='edit'>
                <input type='submit' value='Save' onClick={this.props.onSave}/>
                <input type='submit' value='Cancel' onClick={this.props.onCancel}/>
            </div>
        )
    }
})

module.exports = FormButtons