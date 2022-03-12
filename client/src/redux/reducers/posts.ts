import { IPostDataFromServer } from '../../components/MainPage/MainPage'
import { FETCH_ALL, CREATE, FETCHPOST, TOGGLEFAVORITEFROMIMAGECARD, TOGGLEFAVORITEFROMIMAGEPAGE } from '../constants'

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
        case TOGGLEFAVORITEFROMIMAGEPAGE:
            return action.payload
        default:
            return posts
    }
}  