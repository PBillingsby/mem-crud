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
		console.log(window.ethereum);
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
							>disconnect</button
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
