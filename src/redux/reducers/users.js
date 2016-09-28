import {GET_USERS} from '../actions/UsersAction';

const getInitialState = () => {
    return {
        data: [],
        pagination: {}
    };
}

export default (state = getInitialState(), action) => {
    switch (action.type){
        case GET_USERS:
            const {users, pagination} = action.payload.getUsers;
            return {
                data: users,
                pagination
            }
        default:
            return state;
    }
}