import {selector} from 'recoil'
import { emailState } from '../atoms/email'

export const getEmail = selector({
    key:'getEmail',
    get: ({get}) =>{
        const email = get(emailState);
    }
})