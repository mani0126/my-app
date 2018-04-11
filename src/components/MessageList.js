import React, {Component} from 'react'
import Message from "./message"
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {handleSelect, toggleStarred} from "../actions";

class MessageList extends Component {

    render() {
        const {bulkSelect, toggleStarred, messages, handleSelect} = this.props
        return (
            <div className="message">
                <div>
                    {
                        messages.map((message) => {
                            return <Message key={message.id}
                                            message={message}
                                            toggleStarred={toggleStarred}
                                            bulkSelect={bulkSelect}
                                            handleSelect={handleSelect}/>
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    messages: state.messages
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        toggleStarred: toggleStarred,
        handleSelect: handleSelect
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MessageList)