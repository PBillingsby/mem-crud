<script>
  import { onDestroy } from "svelte";
  import { marked } from "marked";
  import hljs from "highlight.js";
  import SvelteMarkdown from "svelte-markdown";
  import axios from "axios";

  import { posts } from "../../../lib/stores/postStore";
  import Form from "../../../components/form.svelte";

  export let data;
  let loading = false;

  const postFromStore = $posts[data.slug];

  if (postFromStore !== undefined) {
    localStorage.setItem("post", JSON.stringify(postFromStore));
  }

  let post =
    postFromStore === undefined
      ? JSON.parse(localStorage.getItem("post"))
      : postFromStore;

  const renderer = new marked.Renderer();
  renderer.code = (code, language) => {
    const highlightedCode = language
      ? hljs.highlight(language, code).value
      : hljs.highlightAuto(code).value;
    return `<pre><code class="hljs ${language}">${highlightedCode}</code></pre>`;
  };

  async function handleDelete() {
    loading = true;
    try {
      const res = await axios.delete(`/api/posts`, {
        data: {
          function: "removePost",
          pid: data.slug,
          author: localStorage.user,
        },
      });
      if (res.status === 200) {
        history.back();
      }
    } catch (err) {
      console.log(err);
    }
    loading = false;
  }

  onDestroy(() => {
    localStorage.removeItem("post");
  });
</script>

<div class="w-full p-4">
  {#if loading}
    <span>
      <div
        class="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span
          class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span
        >
      </div>
      <p class="text-center">...loading</p>
    </span>
  {:else}
    <div class="border border-gray-400 rounded-md min-h-[80vh] p-4">
      <span class="flex justify-between">
        <div>
          <h1 class="text-2xl font-semibold mb-4">{post?.title}</h1>
          <p class="text-xl text-gray-700 mb-4">
            Description: {post?.description}
          </p>
          <p>by {post?.author}</p>
          <div class="py-2">
            {#if post.categories}
              {#each post?.categories as tag}
                <span
                  class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2 mb-2 cursor-pointer"
                  >{tag}</span
                >
              {/each}
            {/if}
          </div>
        </div>
        <button
          class="flex top-0 cursor-pointer"
          on:click={() => window.my_modal_1.showModal()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-trash color-black stroke-black hover:stroke-red-600"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><line
              x1="4"
              y1="7"
              x2="20"
              y2="7"
            /><line x1="10" y1="11" x2="10" y2="17" /><line
              x1="14"
              y1="11"
              x2="14"
              y2="17"
            /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path
              d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"
            /></svg
          >
        </button>
        <dialog id="my_modal_1" class="modal">
          <form method="dialog" class="modal-box bg-white">
            <h3 class="font-bold text-lg">
              Are you sure you want to delete this file?
            </h3>
            <p>This cannot be undone.</p>
            <div class="modal-action">
              <button
                on:click={handleDelete}
                class="btn hover:bg-red-600 hover:text-white bg-white border-gray-400 text-black font-bold rounded focus:outline-none focus:shadow-outline"
                >Yes</button
              >
              <button
                class="btn hover:bg-gray-300 bg-white border-gray-400 text-black font-bold rounded focus:outline-none focus:shadow-outline"
                >No</button
              >
            </div>
          </form>
        </dialog>
      </span>
      <div class="my-12">
        <p class="text-3xl text-center">Content</p>
        {#if localStorage.getItem("user") === post?.author}
          <div class="flex justify-center text-center">
            <div class="drawer drawer-end">
              <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
              <div class="drawer-content my-4">
                <label
                  for="my-drawer-4"
                  class="drawer-button bg-gray-300 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2 cursor-pointer"
                  >Edit</label
                >
              </div>
              <div class="drawer-side">
                <label for="my-drawer-4" class="drawer-overlay" />
                <ul class="menu p-4 w-[80vw] h-full bg-white text-base-content">
                  <Form isEdit={true} pid={data.slug} />
                </ul>
              </div>
            </div>
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
  {/if}
</div>
