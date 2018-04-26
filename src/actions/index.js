//action creators

import {
    BULKSELECTOFF, BULKSELECTON, DELETED, HANDLEAPPLYLABEL, HANDLEREMOVELABEL, HANDLESELECT, MARKASREAD, MARKASUNREAD,
    TOGGLESTARRED
} from "../constants/actionTypes";

export const toggleStarred = (messageId, starStatus) => {
    const messageIds = [messageId]
    return (dispatch) => {
        patchMessageServer(messageIds, "star", {star: !starStatus}).then(
            dispatch({
                type: TOGGLESTARRED,
                messageId: messageId
            })
        )
    }
}

export const handleSelect = (messageId) => {
    return (dispatch) => {
        dispatch({
            type: HANDLESELECT,
            messageId: messageId
        })
    }
}

export const bulkSelectOn = (messageId) => {
    return (dispatch) => {
        dispatch({
            type: BULKSELECTON,
            messageId: messageId
        })
    }
}
export const bulkSelectOff = (messageId) => {
    return (dispatch) => {
        dispatch({
            type: BULKSELECTOFF,
            messageId: messageId
        })
    }
}

export const markAsRead = (messageIds) => {
    return (dispatch) => {
        patchMessageServer(messageIds, "read", {read: true}).then(
            dispatch({
                type: MARKASREAD
            })
        )
    }
}

export const markAsUnRead = (messageIds) => {
    return async (dispatch) => {
        const response = await patchMessageServer(messageIds, "read", {read: false})
        dispatch({
            type: MARKASUNREAD
        })

    }
}

export const deleted = (messageIds) => {
    return (dispatch) => {
        patchMessageServer(messageIds, "delete", {}).then(
            dispatch({
                type: DELETED
            })
        )
    }
}

export const applyLabel = (selectedLabel, messageIds) => {
    return (dispatch) => {
        patchMessageServer(messageIds, "addLabel", {label: selectedLabel}).then(
            dispatch({
                type: HANDLEAPPLYLABEL,
                selectedLabel: selectedLabel
            })
        )
    }
}

export const removeLabel = (selectedLabel, messageIds) => {
    return (dispatch) => {
        patchMessageServer(messageIds, "removeLabel", {label: selectedLabel}).then(
            dispatch({
                type: HANDLEREMOVELABEL,
                selectedLabel: selectedLabel
            })
        )
    }
}

async function patchMessageServer(messageIds, command, action) {
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



