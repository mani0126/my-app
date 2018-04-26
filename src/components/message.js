import React, {Component} from 'react'
import {handleSelect, toggleStarred} from "../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class message extends Component {

    clickStar = () => {
        const {message, toggleStarred} = this.props
        toggleStarred(message.id, message.starred)
    }

    displayLabel = (labels) => labels.map((label, index) =>
        <span key={index} className="label label-warning">
                    {label}
                    </span>
    )

    render() {
        const {message, handleSelect} = this.props
        const messageStyling = []
        messageStyling.push(message.read ? 'read' : 'unread')
        messageStyling.push(message.selected ? 'selected' : '')

        const starredStyle = message.starred ? "fa-star" : "fa-star-o"

        return (
            <div className={`row message ${messageStyling.join(' ')}`}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox" checked={message.selected} onChange={()=>{handleSelect(message.id)}}/>
                        </div>
                        <div className="col-xs-2">
                            <i className={`fa ${starredStyle}`} onClick={this.clickStar}></i>
                        </div>
                    </div>
                </div>
                <div className="col-xs-11">
                    {this.displayLabel(message.labels)}
                    {message.subject}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        toggleStarred: toggleStarred,
        handleSelect: handleSelect
    }, dispatch)

export default connect(null, mapDispatchToProps)(message)