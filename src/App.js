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
        composeMessage: false
    }

    componentDidMount() {
        this.props.fetchMessages()
    }

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

    render() {
        const {composeMessage} = this.state
        return (
            <div>
                <header>
                    <h1 className="App-title">React Inbox</h1>
                </header>
                <Toolbar toggleCompose={this.toggleCompose}/>
                <ComposeMessage display={composeMessage}
                                composeNewMessage={this.composeNewMessage}/>
                <MessageList/>
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
