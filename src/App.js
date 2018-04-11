import React, {Component} from 'react';
import './App.css';
import MessageList from "./components/MessageList";
import Toolbar from "./components/Toolbar";
import ComposeMessage from "./components/ComposeMessage";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import fetchMessages from "./actions/fetchMessages";

class App extends Component {
    state = {
        messages: [],
        composeMessage: false
    }

    componentDidMount() {
        this.props.fetchMessages()
    }

    labels = ['Apply Label', 'dev', 'personal', 'gschool']
    removeLabels = ['Remove Label', 'dev', 'personal', 'gschool']

    toggleCompose = () => {
        this.setState({composeMessage: !this.state.composeMessage})
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

    messageCount = () => {
        const count = this.props.messages.reduce((acc, message) => {
            if (message.read === false)
                return acc + 1
            return acc
        }, 0)
        return count
    }

    render() {
        const {bulkSelect, composeMessage} = this.state
        const {messages} = this.props
        return (
            <div>
                <header>
                    <h1 className="App-title">React Inbox</h1>
                </header>
                <Toolbar bulkSelect={bulkSelect}
                         labels={this.labels}
                         removeLabels={this.removeLabels}
                         messageCount={this.messageCount}
                         toggleCompose={this.toggleCompose}/>
                <ComposeMessage display={composeMessage}
                                composeNewMessage={this.composeNewMessage}/>
                <MessageList bulkSelect={bulkSelect}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return ({
        messages: state.messages
    })
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        fetchMessages: fetchMessages
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
