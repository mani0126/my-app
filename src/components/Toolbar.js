import React, {Component} from 'react'
import {Button, Input} from 'react-materialize'
import {applyLabel, bulkSelectOff, bulkSelectOn, deleted, markAsRead, markAsUnRead, removeLabel} from "../actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class Toolbar extends Component {

    state = {
        bulkSelect: false
    }

    getMessageIds = () => {
        let messageIds = []
        this.props.messages.map((message) => {
            if (message.selected === true)
                messageIds.push(message.id)
        })
        return messageIds
    }

    toggleBulkSelect = () => {
        const {bulkSelect} = this.state
        this.setState({bulkSelect: !this.state.bulkSelect})
        if (bulkSelect === false)
            this.props.bulkSelectOn(this.getMessageIds())
        else
            this.props.bulkSelectOff(this.getMessageIds())
    }

    handleLabelChange = (e) => {
        console.log(this.state, e.target.value)
        if (e.target.value !== 'Apply Label')
            this.props.applyLabel(e.target.value, this.getMessageIds())
    }

    handleRemoveLabel = (e) => {
        console.log(this.state, e.target.value)
        if (e.target.value !== 'Apply Label')
            this.props.removeLabel(e.target.value, this.getMessageIds())
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
        const {toggleCompose, labels, removeLabels, messageCount} = this.props
        const {deleted, markAsRead, markAsUnRead} = this.props
        const bulkSelectStyle = this.handleButtonState()
        const messageIds = this.getMessageIds()
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
                    <a className="btn btn-danger" onClick={toggleCompose}>
                        <i className="fa fa-plus"></i>
                    </a>
                    <Button className="btn btn-default"
                            onClick={this.toggleBulkSelect}>
                        <i className={`fa ${bulkSelectStyle}`}>
                        </i>
                    </Button>
                    <Button className="btn btn-default" disabled={disabled} onClick={() => markAsRead(messageIds)}>
                        Mark As Read
                    </Button>
                    <Button className="btn btn-default" disabled={disabled} onClick={() => markAsUnRead(messageIds)}>
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

const mapStateToProps = state => {
    return ({
        messages: state.messages
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({
    markAsRead: markAsRead,
    markAsUnRead: markAsUnRead,
    deleted: deleted,
    bulkSelectOn: bulkSelectOn,
    bulkSelectOff: bulkSelectOff,
    applyLabel: applyLabel,
    removeLabel: removeLabel
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)