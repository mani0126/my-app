import React, {Component} from 'react'
import {Button, Input} from 'react-materialize'

class Toolbar extends Component {

    state = {
        bulkSelect: false
    }

    toggleBulkSelect = () => {
        const {bulkSelect} = this.state
        this.setState({bulkSelect: !this.state.bulkSelect})
        if (bulkSelect === false)
            this.props.bulkSelectOn()
        else
            this.props.bulkSelectOff()
    }

    handleLabelChange = (e) => {
        console.log(this.state, e.target.value)
        if (e.target.value !== 'Apply Label')
            this.props.handleApplyLabel(e.target.value)
    }

    handleRemoveLabel = (e) => {
        console.log(this.state, e.target.value)
        if (e.target.value !== 'Apply Label')
            this.props.handleRemoveLabel(e.target.value)
    }

    handleButtonState = () => {
        const {messages} = this.props
        const selectedCount = messages.reduce((acc, message) => {
            if (message.selected === true)
                return acc + 1
            return acc
        }, 0)

        if (selectedCount === messages.length)
            return "fa-check-square"
        else if (selectedCount > 0)
            return "fa-minus-square-o"
        else return "fa-square-o"

    }


    render() {
        const {markAsRead, markAsUnRead, deleted, labels, removeLabels, messageCount} = this.props
        const bulkSelectStyle = this.handleButtonState()
        const disabled = bulkSelectStyle === "fa-square-o" ? true : false

        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge">
                        {messageCount()}
                        </span>
                        unread messages
                    </p>
                    <Button className="btn btn-default"
                            onClick={this.toggleBulkSelect}>
                        <i className={`fa ${bulkSelectStyle}`}>
                        </i>
                    </Button>
                    <Button className="btn btn-default" disabled={disabled} onClick={() => markAsRead()}>
                        Mark As Read
                    </Button>
                    <Button className="btn btn-default" disabled={disabled} onClick={() => markAsUnRead()}>
                        Mark As UnRead
                    </Button>
                    <select className="form-control label-select" disabled={disabled} onChange={this.handleLabelChange}>
                        {labels.map((label, index) => {
                            return (<option key={index}>{label}</option>)
                        })}
                    </select>
                    <select className="form-control label-select" disabled={disabled} onChange={this.handleRemoveLabel}>
                        {removeLabels.map((label, index) => <option key={index}>{label}</option>)}
                    </select>
                    <Button className="btn btn-default" disabled={disabled} onClick={() => deleted()}>
                        <i className="fa fa-trash-o">
                        </i>
                    </Button>
                </div>
            </div>
        )
    }
}

export default Toolbar