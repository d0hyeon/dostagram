import {writable} from 'svelte/store';

type User = {
  username: string;
  email: string;
  uid: string;
}

type UserMap = {
  [key: string]: User
}

export let userState = writable<string[]>([]);
export let userMapState = writable<UserMap>({});