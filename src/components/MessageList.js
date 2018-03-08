import React, {Component} from 'react'
import Message from "./message"

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

export default MessageList