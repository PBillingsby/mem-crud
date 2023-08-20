<script lang="ts">
	import { formatAddress } from "../lib/utils/index";
	import { dummyData } from "../utils/dummyData";
	const tags = [...new Set(dummyData.flatMap((post) => post.tags))];

	let data = dummyData;
	let selectedTag = "";

	// Function to handle tag selection
	function handleTagSelect(event: any) {
		selectedTag = event.target.value;
		if (event.target.value === "") {
			data = dummyData;
		} else {
			data = dummyData.filter((obj) => obj.tags.includes(selectedTag));
		}
	}
</script>

<div class="w-full p-4">
	<div class="border border-gray-400 rounded-md min-h-[80vh] p-4">
		<div class="flex justify-between">
			<div>
				<h1 class="text-center text-4xl">Posts</h1>
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
			<div
				class="max-w-[90vw] max-h-screen overflow-scroll mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black"
			>
				{#each data as post}
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
								{#each post.tags as tag}
									<p>#{tag}</p>
								{/each}
							</div>
							<a href={`/posts/${post.id}`} class="cursor-pointer">
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
</div>
