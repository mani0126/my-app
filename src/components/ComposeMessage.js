import React from 'react'
import {Component} from 'react'

class ComposeMessage extends Component {
    state = {
        subject: '',
        message: ''
    }

    handleMessage = (e) => {
        this.setState({message: e.target.value})
    }

    handleSubject = (e) => {
        this.setState({subject: e.target.value})
    }

    render() {
        const {display, composeNewMessage} = this.props
        const {subject, message} = this.state

        if (!display)
            return <div></div>

        return <form className="form-horizontal well">
            <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                    <h4>Compose Message</h4>
                </div>
            </div>
            <div className="form-group">
                <label for="subject" className="col-sm-2 control-label">Subject</label>
                <div className="col-sm-8">
                    <input type="text" className="form-control" id="subject" placeholder="Enter a subject"
                           name="subject" value={subject} onChange={this.handleSubject}/>
                </div>
            </div>
            <div className="form-group">
                <label for="body" className="col-sm-2 control-label">Body</label>
                <div className="col-sm-8">
                    <textarea name="body" id="body" className="form-control"
                              onChange={this.handleMessage}>{message}</textarea>
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                    <input type="submit" value="Send" className="btn btn-primary"
                           onClick={() => composeNewMessage(subject, message)}/>
                </div>
            </div>
        </form>
    }
}

export default ComposeMessage