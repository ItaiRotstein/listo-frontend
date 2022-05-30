// import { userService } from '../services/user.service.js'


const initialState = {
    // user: userService.getLoggedinUser(),
    user: [],
    users: []
}
export function userReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_USER':
            console.log('test:')            
            newState = { ...state, user: action.user }
            break;
        case 'REMOVE_USER':
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break;
        case 'SET_USERS':
            console.log('test:')            

            newState = { ...state, users: action.users }
            break;
        default:
    }
    // For debug:
    // window.userState = newState;
    // console.log('State:', newState);
    return newState;

}
