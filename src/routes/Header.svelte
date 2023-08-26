<script lang="ts">
	import { onMount } from "svelte";
	import { formatAddress } from "../lib/utils/index";
	import { ethers } from "ethers";

	let provider: any;
	$: user = localStorage.getItem("user");
	onMount(() => {
		if (user) {
			provider = new ethers.providers.Web3Provider(window.ethereum);
		}
	});

	async function connectToMetaMask() {
		if (window.ethereum) {
			// await window.ethereum.request({ method: "eth_requestAccounts" });
			provider = new ethers.providers.Web3Provider(window.ethereum);
			await provider.send("eth_requestAccounts", []);
			const signer = provider.getSigner();
			localStorage.setItem("user", await signer.getAddress());
			try {
			} catch (err) {
				console.log(err);
				return;
			}
		} else {
			alert("You need to install metamask");
		}
	}
</script>

<header>
	<nav>
		<div class="w-full p-4 h-auto flex justify-between">
			<p class="">MEMContent</p>
			<div>
				{#if user}
					<p class="inline-block mr-4">
						Connected as {formatAddress(user || "")}

						<button on:click={() => localStorage.removeItem("user")}
							><svg
								xmlns="http://www.w3.org/2000/svg"
								class="icon icon-tabler icon-tabler-plug-connected-x"
								width="28"
								height="28"
								viewBox="0 0 24 24"
								stroke="black"
								stroke-width="1"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
									d="M20 16l-4 4"
								/><path
									d="M7 12l5 5l-1.5 1.5a3.536 3.536 0 1 1 -5 -5l1.5 -1.5z"
								/><path
									d="M17 12l-5 -5l1.5 -1.5a3.536 3.536 0 1 1 5 5l-1.5 1.5z"
								/><path d="M3 21l2.5 -2.5" /><path
									d="M18.5 5.5l2.5 -2.5"
								/><path d="M10 11l-2 2" /><path d="M13 14l-2 2" /><path
									d="M16 16l4 4"
								/></svg
							></button
						>
					</p>
				{/if}
				{#if !user}
					<button
						on:click={connectToMetaMask}
						class="mx-auto bg-inherit btn border-gray-400 text-black rounded hover:text-white focus:outline-none focus:shadow-outline"
						>Connect</button
					>
				{/if}
				<ul class="flex gap-4 mt-4">
					<li>
						<a href="/">Posts</a>
					</li>
					<li>
						<a href="/create">Create</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</header>
