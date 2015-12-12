var React = require('react')
var NewForm = require('./new-form.jsx')
var Link = require('./link.jsx')
var _ = require('lodash')

var NewButton = React.createClass({
    getInitialState: function(){
        return { isNewing : false}
    },

    render: function(){
        return (
            <div>
                { this.state.isNewing ?
                    <NewForm
                        store={this.props.store}
                        onCancel={this.onCancel}
                        template={this.props.template}
                        href={this.props.href}/> :
                    <Link onClick={this.onNew} text="New"/>
                }
            </div>
        )
    },

    onCancel: function(event){
        this.setState({ isNewing : false })
    },

    onNew: function(event){
        event.preventDefault()
        this.setState({ isNewing : true })
    }
})

module.exports = NewButton