var React = require('react')
var Page = require('./page.jsx')
var _ = require('lodash')
var $ = require('jquery')

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

        function attributes(attributes){
            return _.map(attributes, function(attribute){
                return(
                    <span>
                        <dt>{attribute.prompt}</dt>
                        { context.state.edit ?
                            <dd><input type="text" name={attribute.name} defaultValue={attribute.value} onChange={context.handleAttributeChange}/></dd> :
                            <dd>{attribute.value}</dd>
                        }
                        <br/>
                    </span>
                )
            })
        }

        function editButtons(){
            return (
                <span>
                    <dt></dt>
                    <dd className='edit'>
                        <input type='submit' value='Save' onClick={context.onSave}/>
                        <input type='submit' value='Cancel' onClick={context.onCancel}/>
                    </dd>
                </span>
            )
        }

        function actions(){
            return (
                <p>
                    <a href='#' onClick={context.onEdit}>Edit</a>
                    <a href='#' onClick={context.onDestroy}>Delete</a>
                </p>
            )
        }
        return (
            <Page {...context.props}>
                <h1 onClick={context.onEdit}>Speaker</h1>
                <dl>
                    {attributes(context.getAttributes(context.state.speaker))}
                    { context.state.edit ?
                        editButtons() : null
                    }
                </dl>
                {actions()}
            </Page>
        )
    },

    handleAttributeChange: function(event){
        var scratchSpeaker = _.clone(this.state.scratchSpeaker, true)
        this.updateAttribute(scratchSpeaker, event.target.name, event.target.value)
        this.setState({scratchSpeaker: scratchSpeaker})
    },

    onSave: function(){
        var context = this
        $.ajax('/speakers/' + context.getAttribute(this.state.speaker, 'id').value, {
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
    },

    getAttributes: function(item){
        return item.collection.items[0].data;
    },

    getAttribute: function(item, name){
        return _.find(this.getAttributes(item), function(attr){ return attr.name == name})
    },

    updateAttribute: function(item, name, value){
        this.getAttribute(item, name)['value'] = value
    }
})

module.exports = Show