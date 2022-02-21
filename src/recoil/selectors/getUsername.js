import {selector} from 'recoil'
import { userState } from '../atoms/username'

export const getUser = selector({
    key:'getUser',
    get: ({get}) =>{
        const username = get(userState)
    }
})