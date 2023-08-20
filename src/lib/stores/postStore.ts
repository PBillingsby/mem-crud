import { writable } from 'svelte/store';
import { dummyData } from '../../utils/dummyData';
// Define the Posts interface
interface Post {
  id: number;
  author: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
}

// Create the writable store
export const posts = writable<Post[]>(dummyData);
