<script context="module">
  // @ts-ignore
  export async function load({ page, session }) {
    const url = `api/v1/users/${page.params.slug}`;
    // const { response, json } = await api.get(session.API_ENDPOINT, url);
    // if (response.status === 200) {
    //   return {
    //     props: {
    //       posts: json.data,
    //     },
    //   };
    // } else {
    //   return { props: { posts: [] } };
    // }
    debugger;
  }
</script>

<script>
  // import SvelteMarkdown from "svelte-markdown";
  import { marked } from "marked";
  import hljs from "highlight.js";
  import { posts } from "../../../lib/stores/postStore";

  import SvelteMarkdown from "svelte-markdown";

  export let data;
  const post = $posts.find((post) => post.id.toString() === data.slug);
  const renderer = new marked.Renderer();
  renderer.code = (code, language) => {
    const highlightedCode = language
      ? hljs.highlight(language, code).value
      : hljs.highlightAuto(code).value;
    return `<pre><code class="hljs ${language}">${highlightedCode}</code></pre>`;
  };
</script>

<div class="w-full p-4">
  <div class="border border-gray-400 rounded-md min-h-[80vh] p-4">
    <h1 class="text-2xl font-semibold mb-4">{post?.title}</h1>
    <p class="text-xl text-gray-700 mb-4">Description: {post?.description}</p>
    <p>by {post?.author}</p>
    <div class="py-2">
      {#each post?.tags as tag}
        <span class="bg-gray-300 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2"
          >{tag}</span
        >
      {/each}
    </div>
    <div class="my-12">
      <p class="text-3xl text-center">Content</p>
      {#if localStorage.getItem("user") === post?.author}
        <div class="flex justify-center">
          <a
            href={`/posts/${post?.id}/edit`}
            class="bg-gray-300 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2"
            >Edit</a
          >
          <a
            href={`/posts/${post?.id}/delete`}
            class="bg-gray-300 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2"
            >Delete</a
          >
        </div>
      {/if}
      <div
        class="prose p-4 bg-[#eee] border border-black rounded-md max-w-[75%] mx-auto min-h-screen overflow-scroll"
      >
        <SvelteMarkdown
          source={marked.parse(post?.content || "")}
          renderers={{
            code: (text, options) => renderer.code(text, options.lang),
          }}
        />
      </div>
    </div>
  </div>
</div>
