import {combineReducers} from 'redux';

const INITIAL_STATE = {
    subscription: "",
};

const MessagesReducer = (state= INITIAL_STATE, action: { type: String, payload: String }) => {

    const {subscription} = state;
    switch (action.type) {

        case 'ADD_MESSAGE':
            const new_state = {
                subscription: action.payload,
            };
            return new_state;
            break;
        default:
            return state;
    }
}

export default combineReducers({
    messages: MessagesReducer,
});