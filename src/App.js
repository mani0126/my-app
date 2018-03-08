import React, {Component} from 'react';
import './App.css';
import MessageList from "./components/MessageList";
import Toolbar from "./components/Toolbar";
import {sampleMessages} from "./constants/SampleMessages";

class App extends Component {
    state = {
        messages: sampleMessages
    }

    labels = ['Apply Label', 'dev', 'personal', 'gschool']
    removeLabels = ['Remove Label', 'dev', 'personal', 'gschool']

    toggleStarred = (messageId) => {
        const newState = this.state.messages.map((message) => {
            if (message.id === messageId)
                return ({
                    ...message,
                    starred: !message.starred
                })
            return message
        })
        this.setState({messages: newState})
    }

    handleSelect = (messageId) => {
        const newState = this.state.messages.map((message) => {
            if (message.id === messageId) {
                return ({
                    ...message,
                    selected: message.selected ? !message.selected : true
                })
            }
            return message
        })
        this.setState({messages: newState})
    }

    bulkSelectOn = () => {
        const newState = this.state.messages.map(message => {
            return ({
                ...message,
                selected: true
            })
        })
        this.setState({messages: newState})
    }

    bulkSelectOff = () => {
        const newState = this.state.messages.map(message => {
            return ({
                ...message,
                selected: false
            })
        })
        this.setState({messages: newState})
    }

    markAsRead = () => {
        const newState = this.state.messages.map((message) => {
            if (message.selected === true)
                return ({...message, read: true, selected: false})
            return message
        })

        this.setState({messages: newState})
    }

    markAsUnRead = () => {
        const newState = this.state.messages.map((message) => {
            if (message.selected === true)
                return ({...message, read: false, selected: false})
            return message
        })

        this.setState({messages: newState})
    }

    deleted = () => {
        const newState = this.state.messages.filter((message) => {
            if (message.selected !== true)
                return true
        })

        this.setState({messages: newState})
    }

    handleApplyLabel = (selectedLabel) => {
        const newState = this.state.messages.map((message) => {
            if (message.selected === true && message.labels.indexOf(selectedLabel) === -1)
                return ({...message, labels: message.labels.concat(selectedLabel), selected: false})
            return message
        })

        this.setState({messages: newState})
    }

    handleRemoveLabel = (selectedLabel) => {
        const newState = Object.assign(this.state.messages)
        newState.map((message) => {
            if (message.selected === true) {
                const ino = message.labels.indexOf(selectedLabel)
                if (ino !== -1)
                    message.labels.splice(ino, 1)
                message.selected = false
            }
        })

        this.setState({messages: newState})
    }

    messageCount = () => {
        const count = this.state.messages.reduce((acc, message) => {
            if (message.read === false)
                return acc + 1
            return acc
        }, 0)
        return count
    }


    render() {
        const {bulkSelect, messages} = this.state
        return (
            <div>
                <header>
                    <h1 className="App-title">React Inbox</h1>
                </header>
                <Toolbar bulkSelect={bulkSelect}
                         bulkSelectOn={this.bulkSelectOn}
                         bulkSelectOff={this.bulkSelectOff}
                         markAsRead={this.markAsRead}
                         markAsUnRead={this.markAsUnRead}
                         deleted={this.deleted}
                         labels={this.labels}
                         removeLabels={this.removeLabels}
                         handleApplyLabel={this.handleApplyLabel}
                         handleRemoveLabel={this.handleRemoveLabel}
                         messageCount={this.messageCount}
                         messages={messages}/>
                <MessageList bulkSelect={bulkSelect}
                             messages={messages}
                             toggleStarred={this.toggleStarred}
                             handleSelect={this.handleSelect}/>
            </div>
        )
    }
}

export default App;
