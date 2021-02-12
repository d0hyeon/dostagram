import {writable} from 'svelte/store';
import type {User} from 'src/@types/User';

type UserMap = {
  [key: string]: User
}

export let userState = writable<string[]>([]);
export let userMapState = writable<UserMap>({});
export const addUser = (user: User) => {
  userState.update(prev => ([
    ...prev,
    user.uid
  ]));
  userMapState.update(prev => ({
    ...prev,
    [user.uid]: user
  }))
}