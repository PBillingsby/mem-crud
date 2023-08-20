<script lang="ts">
	import { formatAddress } from "../lib/utils/index";
	import { ethers } from "ethers";
	let provider: any;

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
				{#if localStorage.getItem("user")}
					<p class="inline-block mr-4">
						Connected as {formatAddress(localStorage.getItem("user") || "")}
					</p>
				{/if}
				{#if !localStorage.getItem("user")}
					<button
						on:click={connectToMetaMask}
						class="mx-auto bg-inherit btn border-gray-400 text-black rounded hover:text-white focus:outline-none focus:shadow-outline"
						>Connect</button
					>
				{/if}
				<ul class="flex gap-4">
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
