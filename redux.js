import {createActions, combineActions, handleActions} from 'redux-actions'

const initialState = {
    email: '',
    pass: '',
    isLoggingIn: false
}

const LOGIN = 'LOGIN'
const SHOW_LOGIN_SPINNER = 'SHOW_LOGIN_SPINNER'
const HIDE_LOGIN_SPINNER = 'HIDE_LOGIN_SPINNER'

export const {
    showLoginSpinner,
    hideLoginSpinner
} = createActions({
        [SHOW_LOGIN_SPINNER]: () => true,
        [HIDE_LOGIN_SPINNER]: () => false
    }
)

export const login = () => {
    return async (dispatch, getState, {getFirestore}) => {

        dispatch(showLoginSpinner())
        const firestore = getFirestore()
        console.log(firestore)
        try {
            // await firestore.collection('items').add({
            //     cuc: 'cucu',
            //     bau: 33
            // })
            dispatch(login())
            dispatch(hideLoginSpinner())
        } catch (e) {
            dispatch(login(e))
            dispatch(hideLoginSpinner())
        }
    }
}

export default handleActions({
    [combineActions(SHOW_LOGIN_SPINNER, HIDE_LOGIN_SPINNER)]: (state, action) => {
        return {...state, isLoggingIn: action.payload}
    },
    [LOGIN]: {
        next: (state, action) => {
            return {
                ...state,
                anonymous: false,
                error: ''
            }
        },
        throw: (state, action) => {
            return {...state, error: action.payload.message}
        }
    }

}, initialState)
