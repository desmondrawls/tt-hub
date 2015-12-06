var React = require('react')
var Page = require('./page.jsx')
var _ = require('lodash')
var $ = require('jquery')

var Show = React.createClass({
    getInitialState: function(){
        return {edit: true}
    },

    render: function(){
        var context = this

        function attributes(attributes){
            return _.map(attributes, function(attribute){
                return(
                    <span>
                        <dt>{attribute.prompt}</dt>
                        { context.state.edit ?
                            <dd className='edit'>{attribute.value}</dd> :
                            <dd className='view'>{attribute.value}</dd>
                        }
                        <br/>
                    </span>
                )
            })
        }
        var test = function(){
            console.log("clicked")
        }

        function editButtons(){
            return (
                <span>
                    <dt></dt>
                    <dd className='edit'>
                        <input type='submit' value='Save' onClick={test}/>
                        <input type='submit' value='Cancel' onClick={context.cancel}/>
                    </dd>
                </span>
            )
        }

        function actions(){
            return (
                <p>
                    <a href='#' onClick={context.edit}>Edit</a>
                    <a href='#' onClick={context.destroy}>Delete</a>
                </p>
            )
        }
        return (
            <Page {...context.props}>
                <h1 onClick={this.edit}>Speaker</h1>
                <dl>
                    {attributes(context.props.attributes)}
                    { context.state.edit ?
                        editButtons() : null
                    }
                </dl>
                {actions()}
            </Page>
        )
    },

    save: function(id){
    },

    edit: function(){
        this.setState({edit: true})
    },

    cancel: function(){
        this.setState({edit: false})
    },

    destroy: function(id) {
    }
})

module.exports = Show