import { IPostDataFromServer } from '../../components/MainPage/MainPage'
import { FETCH_ALL, CREATE, FETCHPOST, TOGGLEFAVORITEFROMIMAGECARD, TOGGLEFAVORITEFROMIMAGEPAGE, UPDATE, DELETE } from '../constants'

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
        case TOGGLEFAVORITEFROMIMAGECARD:
            return posts.map((post: IPostDataFromServer) => 
            post._id === action.payload._id ? action.payload : post )
        case UPDATE:
        case TOGGLEFAVORITEFROMIMAGEPAGE:
            return action.payload
        case DELETE:
        default:
            return posts
    }
}  