import React, {Component} from 'react'
import Message from "./message"
import {connect} from "react-redux";

class MessageList extends Component {

    render() {
        const {messages} = this.props
        return (
            <div className="message">
                <div>
                    {
                        messages.map((message) => {
                            return <Message key={message.id}
                                            message={message}/>
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

export default connect(mapStateToProps)(MessageList)