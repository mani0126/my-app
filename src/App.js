import React, {Component} from 'react';
import './App.css';
import MessageList from "./components/MessageList";
import Toolbar from "./components/Toolbar";
import ComposeMessage from "./components/ComposeMessage";

class App extends Component {
    state = {
        messages: [],
        composeMessage: false
    }

    async componentDidMount() {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
        const messages = await response.json()
        console.log("messages is ", messages._embedded.messages)
        this.setState({messages: messages._embedded.messages})
    }

    labels = ['Apply Label', 'dev', 'personal', 'gschool']
    removeLabels = ['Remove Label', 'dev', 'personal', 'gschool']

    toggleStarred = (messageId) => {
        const newState = this.state.messages.map((message) => {
            if (message.id === messageId) {
                this.patchMessageServer([messageId], "star", {star: !message.starred})
                return ({
                    ...message,
                    starred: !message.starred
                })
            }
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

    toggleCompose = () => {
        this.setState({composeMessage: !this.state.composeMessage})
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
        const messageIds = []
        const newState = this.state.messages.map((message) => {
            if (message.selected === true) {
                messageIds.push(message.id)
                return ({...message, read: true, selected: false})
            }
            return message
        })

        this.patchMessageServer(messageIds, "read", {read: true})
        this.setState({messages: newState})
    }

    markAsUnRead = () => {
        const messageIds = []
        const newState = this.state.messages.map((message) => {
            if (message.selected === true) {
                messageIds.push(message.id)
                return ({...message, read: false, selected: false})
            }
            return message
        })

        this.patchMessageServer(messageIds, "read", {read: false})
        this.setState({messages: newState})
    }

    async composeNewMessage(subject, message) {
        const composeUrl = `${process.env.REACT_APP_API_URL}/api/messages`

        const requestBody = {
            subject,
            message
        }
        try {
            await fetch(composeUrl, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    async patchMessageServer(messageIds, command, action) {
        const patchUrl = `${process.env.REACT_APP_API_URL}/api/messages`
        const requestBody = {
            messageIds,
            command,
            ...action
        }

        try {
            await fetch(patchUrl, {
                method: 'PATCH',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    deleted = () => {
        const messageIds = []
        const newState = this.state.messages.filter((message) => {
            if (message.selected !== true) {
                return true
            }
            messageIds.push(message.id)
        })

        this.patchMessageServer(messageIds, "delete", {})
        this.setState({messages: newState})
    }

    handleApplyLabel = (selectedLabel) => {
        const messageIds = []
        const newState = this.state.messages.map((message) => {
            if (message.selected === true && message.labels.indexOf(selectedLabel) === -1) {
                messageIds.push(message.id)
                return ({...message, labels: message.labels.concat(selectedLabel), selected: false})
            }
            return message
        })

        this.patchMessageServer(messageIds, "addLabel", {label: selectedLabel})
        this.setState({messages: newState})
    }

    handleRemoveLabel = (selectedLabel) => {
        const messageIds = []
        const newState = Object.assign(this.state.messages)
        newState.map((message) => {
            if (message.selected === true) {
                messageIds.push(message.id)
                const ino = message.labels.indexOf(selectedLabel)
                if (ino !== -1)
                    message.labels.splice(ino, 1)
                message.selected = false
            }
        })

        this.patchMessageServer(messageIds, "removeLabel", {label: selectedLabel})
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
        const {bulkSelect, messages, composeMessage} = this.state
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
                         toggleCompose={this.toggleCompose}
                         messages={messages}/>
                <ComposeMessage display={composeMessage}
                                composeNewMessage={this.composeNewMessage}/>
                <MessageList bulkSelect={bulkSelect}
                             messages={messages}
                             toggleStarred={this.toggleStarred}
                             handleSelect={this.handleSelect}/>
            </div>
        )
    }
}

export default App;
