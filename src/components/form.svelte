<script lang="ts">
  import axios from "axios";
  import { writable } from "svelte/store";
  import { ethers } from "ethers";
  import { marked } from "marked";
  import SvelteMarkdown from "svelte-markdown";

  // To get authoring account
  let provider: any;
  let connectedAccount: string | undefined;
  let signature = "";

  // loading state
  let loading = false;
  let saved = false;
  export let isEdit: boolean = false;

  export let pid: number = -1;
  const postJSON = localStorage.getItem("post");
  let post: any = {};

  if (postJSON !== null) {
    try {
      post = JSON.parse(postJSON);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }
  // Form data handling
  let title: string = isEdit ? post.title : "";
  const markdown = writable("");
  let description: string = isEdit ? post.description : "";
  let tags: string[] = isEdit ? post.categories : [];
  let tagInput: string = "";

  if (!isEdit && !$markdown && localStorage.getItem("markdown")) {
    markdown.set(localStorage.getItem("markdown") || "");
  } else {
    markdown.set(post.content);
  }
  // Tag functionality
  function addTag() {
    if (tags.includes(tagInput) || tags.length >= 4) return;
    if (tagInput.trim() !== "") {
      tags = [...tags, tagInput.trim().toLowerCase()];
      tagInput = "";
    }
  }

  function removeTag(index: number) {
    tags = tags.filter((_, i) => i !== index);
  }

  // Markdown handling
  function handleMarkdown(e: Event) {
    const target = e.target as HTMLInputElement;
    markdown.set(target.value);
    marked.parse($markdown);
  }

  function saveMarkdown() {
    saved = true;
    localStorage.setItem("markdown", $markdown);
    setTimeout(() => {
      saved = false;
    }, 3000);
  }

  function handleClear() {
    markdown.set("");
    localStorage.removeItem("markdown");
    window.location.reload();
  }

  // POST to MEM
  async function handleSubmit(event: Event) {
    event.preventDefault();
    loading = true;
    try {
      if (signature && connectedAccount) return;
      await connectToMetaMask();
    } catch (err) {
      console.log(err);
    }

    try {
      const func: string = isEdit ? "updatePost" : "createPost";
      const req = await axios[isEdit ? "post" : "post"](
        "/api/posts",
        {
          functionId: "VWPW_NwscxexXJ3IcV97O8bIchZ97vEJ1hsOfycBZWw",
          input: {
            function: func,
            data: {
              author: connectedAccount,
              description: description,
              title: title,
              content: $markdown,
              categories: tags,
              ...(isEdit ? { pid: pid } : {}),
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      loading = false;

      return req.data;
    } catch (error) {
      console.log(error);
    }
    loading = false;
  }

  async function connectToMetaMask() {
    if (window.ethereum) {
      // await window.ethereum.request({ method: "eth_requestAccounts" });
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      connectedAccount = await signer.getAddress();
      try {
        await requestSignature();
      } catch (err) {
        console.log(err);
        return;
      }
    } else {
      alert("You need to install metamask");
    }
  }

  async function requestSignature() {
    try {
      const signer = provider.getSigner();
      signature = await signer.signMessage(
        `Sign to ${isEdit ? "edit" : "create"} post ${pid !== -1 ? pid : ""}`
      );
    } catch (error) {
      console.error("Error while requesting signature:", error);
      return;
    }
  }
</script>

<div>
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
    <form class="p-4 mt-12 text-center">
      <div>
        <label class="block text-black text-lg font-semibold mb-2" for="content"
          >Content</label
        >
        <textarea
          on:input={handleMarkdown}
          value={isEdit ? post.content : localStorage.getItem("markdown")}
          class={`text-black p-2 border border-gray-400 rounded-md ${
            isEdit ? "w-[60vw]" : "w-[90vw]"
          } h-[45vh] overflow-scroll`}
          id="markdown"
        />
      </div>
      <div class="flex gap-2 mx-auto justify-center">
        <div class="mb-4">
          <label class="block text-black text-lg font-semibold mb-2" for="title"
            >Title</label
          >
          <input
            type="text"
            id="title"
            placeholder="eg - Intro to Arweave"
            bind:value={title}
            class="px-3 py-2 border rounded-lg focus:outline-none focus:ring border-gray-400"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-black text-lg font-semibold mb-2"
            for="description"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            placeholder="eg - Guide to Arweave"
            bind:value={description}
            class="px-3 py-2 border rounded-lg focus:outline-none focus:ring border-gray-400"
          />
        </div>
        <div>
          <label class="text-black text-lg font-semibold mb-2" for="tags"
            >Tags</label
          >
          <div class="mb-4">
            <input
              type="text"
              bind:value={tagInput}
              class="px-3 py-2 border rounded-lg focus:outline-none focus:ring border-gray-400"
              placeholder="Add a tag"
            />
            <button
              type="button"
              class="text-black text-center items-center font-bold px-3 py-1 rounded"
              on:click={addTag}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-plus"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                stroke="black"
                stroke-width="1.5"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><line
                  x1="12"
                  y1="5"
                  x2="12"
                  y2="19"
                /><line x1="5" y1="12" x2="19" y2="12" /></svg
              >
            </button>
            <div class="flex flex-wrap gap-2 p-2">
              {#each tags as tag, index (tag)}
                <div class="py-2 items-center mb-2">
                  <div
                    class="text-black flex flex-wrap rounded-lg px-2 py-1 border border-black"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      class="ml-2"
                      on:click={() => removeTag(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke="black"
                        stroke-width="1.5"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="drawer drawer-end m-0">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex mx-auto gap-2">
        <label
          for="my-drawer"
          class="hover:bg-gray-300 bg-white btn border-gray-400 text-black font-bold py-2 rounded focus:outline-none focus:shadow-outline drawer-button"
          >Preview</label
        >
        {#if !isEdit}
          <button
            on:click={handleClear}
            type="button"
            class="mx-auto hover:bg-gray-300 bg-white btn border-gray-400 text-black font-bold py-2 rounded focus:outline-none focus:shadow-outline"
          >
            Clear
          </button>
        {/if}
        <button
          on:click={saveMarkdown}
          type="button"
          class="mx-auto hover:bg-gray-300 bg-white btn border-gray-400 text-black font-bold py-2 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
        <div
          class={`${saved ? "visible" : "hidden"} toast toast-top toast-end`}
        >
          <div class="alert alert-success flex">
            <span>Saved</span>
          </div>
        </div>
        <button
          on:click={handleSubmit}
          class="mx-auto hover:bg-gray-300 bg-white btn border-gray-400 text-black font-bold py-2 rounded focus:outline-none focus:shadow-outline"
        >
          Next
        </button>
      </div>
      <div class="drawer-side h-full">
        <label for="my-drawer" class="drawer-overlay" />
        <ul
          class="menu bg-white px-12 overflow-scroll h-full text-base-content prose"
        >
          {#if $markdown || localStorage.getItem("markdown")}
            <article
              class="prose p-4 w-full bg-[#eee] border border-black rounded-md mx-auto min-h-screen overflow-scroll"
            >
              <SvelteMarkdown
                source={marked.parse(
                  $markdown || localStorage.getItem("markdown")
                )}
              />
            </article>
          {/if}
        </ul>
      </div>
    </div>
  {/if}
</div>
