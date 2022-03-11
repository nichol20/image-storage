import { FETCH_ALL, CREATE, FETCHPOST } from '../constants'

interface IAction {
    type: String
    payload?: any
}

export const posts = (posts = [], action: IAction ) => {
    switch (action.type) {
        case FETCH_ALL:
        case FETCHPOST:
            return action.payload
        case CREATE:
            return [ ...posts, action.payload ]
        default:
            return posts
    }
}  