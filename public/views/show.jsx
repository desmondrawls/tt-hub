var React = require('react')
var Page = require('./page.jsx')
var Link = require('./link.jsx')
var Details = require('./details.jsx')
var _ = require('lodash')
var $ = require('jquery')
var attributeHelpers = require('./collectionJsonHelpers/attributes.js')

var Show = React.createClass({
    getInitialState: function(){
        return {
            speaker: this.props.speaker,
            scratchSpeaker: this.props.speaker,
            edit: false
        }
    },

    render: function(){
        var context = this

        function editButtons(){
            return (
                <div className='edit'>
                    <input type='submit' value='Save' onClick={context.onSave}/>
                    <input type='submit' value='Cancel' onClick={context.onCancel}/>
                </div>
            )
        }
        return (
            <Page {...context.props}>
                <h1>Speaker</h1>
                <Details
                    attributes={attributeHelpers.getAttributes(context.state.speaker)}
                    onChange={context.handleAttributeChange}
                    edit={context.state.edit}
                />
                { context.state.edit ?
                    editButtons() : null
                }
                <p>
                    <Link onClick={context.onEdit} text="Edit"/>
                    <Link onClick={context.onDestroy} text="Delete"/>
                </p>
            </Page>
        )
    },

    handleAttributeChange: function(event){
        var scratchSpeaker = _.clone(this.state.scratchSpeaker, true)
        attributeHelpers.updateAttribute(scratchSpeaker, event.target.name, event.target.value)
        this.setState({scratchSpeaker: scratchSpeaker})
    },

    onSave: function(){
        var context = this
        $.ajax('/speakers/' + attributeHelpers.getAttribute(this.state.speaker, 'id').value, {
            method: 'PUT',
            data: this.state.scratchSpeaker,
            success: function(data){
                context.setState({speaker: JSON.parse(data)})
                context.onCancel()
            }
        })
    },

    onEdit: function(){
        this.setState({edit: true})
    },

    onCancel: function(){
        this.setState({edit: false})
    },

    onDestroy: function(id) {
        console.log("DESTROOOOYYYYY!!!")
    }
})

module.exports = Show