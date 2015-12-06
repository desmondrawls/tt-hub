var React = require('react')
var Page = require('./page.jsx')
var _ = require('lodash')
var $ = require('jquery')

var Show = React.createClass({
    getInitialState: function(){
        return {
            bulk: this.props.bulk,
            scratchpad: this.props.bulk,
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
                    {attributes(context.state.bulk.collection.items[0].data)}
                    { context.state.edit ?
                        editButtons() : null
                    }
                </dl>
                {actions()}
            </Page>
        )
    },

    handleAttributeChange: function(event){
        var attributes = this.state.bulk.collection.items[0].data
        var oldAttribute = _.find(attributes, function(attr){return attr.name == event.target.name})
        var newAttribute = _.merge(_.clone(oldAttribute, true), {value: event.target.value})
        var index = _.indexOf(attributes, oldAttribute)
        var newBulk = _.clone(this.state.bulk, true)
        newBulk.collection.items[0].data.splice(index, 1, newAttribute)
        this.setState({scratchpad: newBulk})
    },

    onSave: function(){
        var context = this
        this.setState({bulk: this.state.scratchpad})
        $.ajax('/speakers/' + context.findAttribute('id').value, {
            method: 'PUT',
            data: this.state.scratchpad,
            complete: function () {
                context.onCancel()
                //location.reload()
            }
        })
        //this.onCancel()
    },

    onEdit: function(){
        this.setState({edit: true})
    },

    onCancel: function(){
        this.setState({edit: false})
    },

    onDestroy: function(id) {
    },

    findAttribute: function(name){
        return _.find(this.state.bulk.collection.items[0].data, function(attr){ return attr.name == name})
    }
})

module.exports = Show