import { writable } from 'svelte/store';
// Define the Posts interface
interface Post {
  id: number;
  author: string;
  title: string;
  description: string;
  content: string;
  categories: string[];
}

// Create the writable store
export const posts = writable([]);

