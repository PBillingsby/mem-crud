import { writable } from 'svelte/store';
// Define the Posts interface
interface User {
  id: string;

}

// Create the writable store
export const user = writable<User>();
