import {selector} from 'recoil'
import { userListState } from '../atoms/userlist'

export const getUsers = selector({
    key:'getUsers',
    get: ({get}) =>{
        const userlist = get(userListState);
        
        return userlist
    }
})