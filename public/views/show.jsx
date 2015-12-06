var React = require('react')
var Page = require('./page.jsx')
var _ = require('lodash')
var $ = require('jquery')

var Show = React.createClass({
    getInitialState: function(){
        return {
            attributes: this.props.initialAttributes,
            scratchpad: this.props.initialAttributes,
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
                    {attributes(context.state.attributes)}
                    { context.state.edit ?
                        editButtons() : null
                    }
                </dl>
                {actions()}
            </Page>
        )
    },

    handleAttributeChange: function(event){
        var oldAttribute = _.find(this.state.attributes, function(attr){return attr.name == event.target.name})
        var newAttribute = _.merge(_.clone(oldAttribute, true), {value: event.target.value})
        var index = _.indexOf(this.state.attributes, oldAttribute)
        var attributes = _.fill(_.clone(this.state.attributes, true), newAttribute, index, index + 1)
        this.setState({scratchpad: attributes})
    },

    onSave: function(){
        this.setState({attributes: this.state.scratchpad})
        this.onCancel()
    },

    onEdit: function(){
        this.setState({edit: true})
    },

    onCancel: function(){
        this.setState({edit: false})
    },

    onDestroy: function(id) {
    }
})

module.exports = Show