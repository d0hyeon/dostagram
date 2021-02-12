import {writable} from 'svelte/store';

type Access = string;

export let accessState = writable<Access | null>(null);