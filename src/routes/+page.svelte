<script lang="ts">
	import { onMount } from "svelte";
	import { formatAddress } from "../lib/utils/index";
	import { posts } from "./../lib/stores/postStore";
	import axios from "axios";

	let data: object[] = [];
	let tags: string[] = [];
	let selectedTag = "";
	let loading = false;

	onMount(async () => {
		try {
			loading = true;
			const response = (await axios.get("/api/posts"))?.data;

			if (Object.keys(response).length === 0) {
				loading = false;
				return;
			}
			data = response.data?.filter(
				(value: object) => Object.keys(value).length !== 0
			);

			posts.set(data as any);
			tags = [...new Set(data.flatMap((post) => post.categories))];
			loading = false;
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	});

	// Function to handle tag selection
	function handleTagSelect(event: any) {
		selectedTag = event.target.value;
		data = $posts;
		if (event.target.value === "") {
			data = $posts;
		} else {
			data = data.filter((obj) => obj.categories.includes(selectedTag));
		}
	}
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
			<div class="flex justify-between">
				<div class="mx-auto">
					<h1 class="text-4xl">Posts</h1>
					<p class="text-lg font-semibold text-center">Filter by tag</p>
					<div class="flex gap-2">
						<select
							id="tagSelect"
							class="border-0 px-2 py-1 cursor-pointer rounded-full drop-shadow-md bg-sky-200 duration-300"
							bind:value={selectedTag}
							on:change={handleTagSelect}
						>
							<option id="all" value="">All</option>
							{#each tags.sort() as tag}
								<option value={tag}>{tag}</option>
							{/each}
						</select>
					</div>
				</div>
				<a href="/create">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="cursor-pointer float-right"
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
				</a>
			</div>
			<div class="py-12">
				{data.length} Posts
				<div
					class="max-h-screen overflow-scroll mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black"
				>
					{#each data as post, index}
						<div
							class="w-full md:w-[23.75rem] border border-gray-400 p-4 rounded-md shadow-xl"
						>
							<h3 class="truncate text-center text-xl">
								{post.title}
							</h3>
							<p class="truncate text-xs text-center">
								by: {formatAddress(post.author)}
							</p>
							<div class="flex justify-between pt-4">
								<div class="flex gap-2">
									{#if post.categories && post.categories.length > 0}
										{#each post.categories as tag}
											<p>#{tag}</p>
										{/each}
									{/if}
								</div>
								<a href={`/posts/${index}`} class="cursor-pointer">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="float-right pl-2"
										width="26"
										height="26"
										viewBox="0 0 24 24"
										stroke="black"
										stroke-width="1.5"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
										><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
											d="M4 9h8v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1z"
										/></svg
									>Read
								</a>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
