import {RECEIVEDMESSAGES} from "../constants/actionTypes";

function fetchMessages() {
    return async (dispatch) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
        const messages = await response.json()
        //console.log("messages is ", messages._embedded.messages)
        dispatch({
            type: RECEIVEDMESSAGES,
            messages: messages._embedded.messages
        })
    }
}

export default fetchMessages