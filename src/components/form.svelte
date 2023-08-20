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
  let loading = false;

  // Form data handling
  export let title: string = "";
  const markdown = writable("");
  let tagInput: string = "";
  let description: string = "";
  let tags: string[] = ["hey"];

  // Tag functionality
  function addTag() {
    if (tags.includes(tagInput) || tags.length >= 4) return;
    if (tagInput.trim() !== "") {
      tags = [...tags, tagInput.trim()];
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
    localStorage.setItem("markdown", $markdown);
  }

  function handleClear() {
    markdown.set("");
    localStorage.clear();
    window.location.reload();
  }

  // POST to MEM
  async function handleSubmit(event: Event) {
    event.preventDefault();
    debugger;
    loading = true;
    try {
      if (signature && connectedAccount) return;
      await connectToMetaMask();
    } catch (err) {
      console.log(err);
    }

    try {
      const req = await axios.post(
        "https://api.mem.tech/api/transactions",
        {
          functionId: "kaIO8XpZX5OgkCPVkrfq38UIaq9Ipfiz3ma6VJdK-ow",
          inputs: [
            {
              function: "createPost",
              data: {
                author: connectedAccount,
                description,
                title,
                content: markdown,
                tags,
              },
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
      signature = await signer.signMessage("Sign to post to MEM");
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
    <form class="p-4 md:flex mx-auto mt-12">
      <div class="w-full">
        <label class="block text-black text-lg font-semibold mb-2" for="content"
          >Content</label
        >
        <textarea
          on:input={handleMarkdown}
          value={localStorage.getItem("markdown")}
          rows={14}
          cols={100}
          class="text-black p-2 border border-gray-400 rounded-md w-auto"
          id="markdown"
        />
      </div>
      <div class="w-full gap-2 text-center">
        <div class="mb-4">
          <label class="block text-black text-lg font-semibold mb-2" for="title"
            >Title</label
          >
          <input
            type="text"
            id="title"
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
            bind:value={description}
            class="px-3 py-2 border rounded-lg focus:outline-none focus:ring border-gray-400"
          />
        </div>
        <div>
          <div class="mb-4">
            <label
              class="block text-black text-lg font-semibold mb-2"
              for="tags">Tags</label
            >
            <div>
              <input
                type="text"
                bind:value={tagInput}
                class="ml-16 px-3 py-2 border rounded-lg focus:outline-none focus:ring border-gray-400"
                placeholder="Add a tag"
              />
              <button
                type="button"
                class="text-black text-center font-bold px-3 py-1 rounded"
                on:click={addTag}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-plus"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  stroke="#e2e8f0"
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
              <div class="flex flex-wrap gap-2">
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
      </div>
    </form>
    <div class="drawer drawer-end m-0">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <label
          for="my-drawer"
          class="hover:bg-gray-300 bg-white btn border-gray-400 text-black font-bold py-2 rounded focus:outline-none focus:shadow-outline drawer-button"
          >Preview</label
        >
        <button
          on:click={handleClear}
          type="button"
          class="mx-auto hover:bg-gray-300 bg-white btn border-gray-400 text-black font-bold py-2 rounded focus:outline-none focus:shadow-outline"
        >
          Clear
        </button>
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
          class="menu bg-white w-[70vw] px-12 overflow-scroll h-full text-base-content"
        >
          {#if $markdown || localStorage.getItem("markdown")}
            <article
              class="bg-white text-black rounded-lg p-6 mx-auto prose lg:prose-xl"
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
