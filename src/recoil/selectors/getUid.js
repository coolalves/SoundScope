import {selector} from 'recoil'
import { uidState } from '../atoms/uid'

export const getUid = selector({
    key: 'getUid', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const uid = get(uidState);
  
      return uid;
    },
  });