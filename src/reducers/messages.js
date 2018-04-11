import {
    TOGGLESTARRED,
    MARKASREAD,
    MARKASUNREAD,
    HANDLEAPPLYLABEL,
    HANDLEREMOVELABEL,
    DELETED,
    BULKSELECTON,
    BULKSELECTOFF,
    HANDLESELECT,
    RECEIVEDMESSAGES
} from '../constants/actionTypes.js'

function messages(state = [], action) {
    let newState = []
    switch (action.type) {
        case RECEIVEDMESSAGES:
            return action.messages
        case TOGGLESTARRED:
            newState = state.map((message) => {
                if (message.id === action.messageId) {
                    return ({
                        ...message,
                        starred: !message.starred
                    })
                }
                return message
            })
            return newState
        case HANDLESELECT:
            newState = state.map((message) => {
                if (message.id === action.messageId) {
                    return ({
                        ...message,
                        selected: message.selected ? !message.selected : true
                    })
                }
                return message
            })
            return newState
        case BULKSELECTON:
            newState = state.map(message => {
                return ({
                    ...message,
                    selected: true
                })
            })
            return newState
        case BULKSELECTOFF:
            newState = state.map(message => {
                return ({
                    ...message,
                    selected: false
                })
            })
            return newState
        case MARKASREAD:
            newState = state.map((message) => {
                if (message.selected === true) {
                    return ({...message, read: true, selected: false})
                }
                return message
            })
            return newState
        case MARKASUNREAD:
            newState = state.map((message) => {
                if (message.selected === true) {
                    return ({...message, read: false, selected: false})
                }
                return message
            })
            return newState
        case DELETED:
            newState = state.filter((message) => {
                if (message.selected !== true) {
                    return true
                }
            })
            return newState
        case HANDLEAPPLYLABEL:
            newState = state.map((message) => {
                if (message.selected === true && message.labels.indexOf(action.selectedLabel) === -1) {
                    return ({...message, labels: message.labels.concat(action.selectedLabel), selected: false})
                }
                return message
            })
            return newState
        case HANDLEREMOVELABEL:
            newState = Object.assign(state)
            return newState.map((message) => {
                if (message.selected === true) {
                    const ino = message.labels.indexOf(action.selectedLabel)
                    if (ino !== -1)
                        message.labels.splice(ino, 1)
                    message.selected = false
                }
                return message
            })
        default:
            return state
    }
}

export default messages