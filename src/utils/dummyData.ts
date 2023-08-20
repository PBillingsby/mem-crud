export const dummyData = [
  {
    id: 1,
    author: '0x765fEB3FB358867453B26c715a29BDbbC10Be772',
    title: 'Decentralized Storage',
    description: 'An article about the important of decentralized storage',
    content: `<h1 id="arweave-nextjs-template">Arweave / NextJS Template</h1>
    <p>This template uses Arweave, Warp Contracts, NextJS, TailwindCSS, DaisyUI and uvu.</p>
    <p>Get template <a href="https://github.com/PBillingsby/arweave-nextjs-template" target="_blank">here</a></p>
    <h2 id="setup">Setup</h2>
    <p>You will need an Arweave wallet which you can get from <a href="https://arconnect.io">arconnect</a> or <a href="https://arweave.app/welcome">arweave</a>. Save the <code>wallet.json</code> file and place it in the root of the project directory. <b>MAKE SURE ITS ACKNOWLEDGED BY .gitignore</b>.</p>
    <p>To deploy a dApp or contract to mainnet this template uses Bundlr node2. Fund a Bundlr instance by running <code>yarn fund &lt;amount&gt;</code>. To use node1, change references in package.json to node1. Note - Funding can take up to 30 minutes to register funds.</p>
    <p>Add a <code>.env</code> file and add the variable <code>WARP</code>, setting it to either <code>local</code> or <code>mainnet</code> depending on your use case.</p>
    <p>Install your dependencies with <code>yarn</code>.</p>
    <h2 id="gateways">Gateways</h2>
    <p>To interact with Arweave and Warp Contracts you must initialize a gateway to connect to. The Arweave gateway added to this template connect to mainnet. The Warp-Contracts gateway is conditionally chosen based on your <code>WARP</code> variable. These are located in <code>utils/index.js</code> and are available to all pages by pulling in the <code>MainContext</code>.</p>
    <p>At the top of a page file import the dependencies.</p>
    <pre><code><span class="hljs-keyword">import</span> { useContext } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
    <span class="hljs-keyword">import</span> { MainContext } <span class="hljs-keyword">from</span> <span class="hljs-string">'../context'</span>
    </code></pre><p>Inside of your component, declare the <code>arweave</code> and <code>warp</code> variables set to the context.</p>
    <pre><code><span class="hljs-keyword">const</span> { arweave, warp } = useContext(MainContext)
    </code></pre><p>Now you can use these variables globally to call functions provided by the <code>arweave-js</code> and <code>warp-contracts</code> SDK&#39;s.</p>
    <p>Example:
    This will query the Arweave network for data using GraphQL: </p>
    <pre><code>await arweave<span class="hljs-selector-class">.api</span><span class="hljs-selector-class">.post</span>("graphql", your_query)
    </code></pre><p>This connects to specific Arweave smart contracts and reads its state: </p>
    <pre><code><span class="hljs-keyword">const</span> warp.contract(<span class="hljs-string">"CONTRACT_ID"</span>).connect(jwk)
    <span class="hljs-keyword">const</span> { cachedValue } = await contract.setEvaluationOptions({
       allowBigInt: <span class="hljs-keyword">true</span>
    }).readState()
    </code></pre><p>Find out more:</br>
    <a href="https://github.com/ArweaveTeam/arweave-js" target="_blank">Arweave SDK</a></br>
    <a href="https://github.com/warp-contracts/warp" target="_blank">Warp Contracts SDK</a></p>
    <h2 id="testing-smart-contract">Testing smart contract</h2>
    <p>In <code>tests/index.mjs</code> there is a basic test that will deploy the counter contract and check if the state <code>clicks</code> has incremented. This is a way to test contracts before deploying to mainnet and using them in dApps. Creating contracts and deploying to a local testnet is a good way to ensure the contracts do exactly as needed before deploying to mainnet.</p>
    <p>Use <code>yarn test</code> to run tests. </p>
    <ul>
    <li>Flow of the test:<ul>
    <li>Creating ArLocal testing environment inside test</li>
    <li>Deploy contract to local</li>
    <li>Checks contract state</li>
    <li>Generate local wallet for contract interaction</li>
    <li>Write contract interaction - <code>clicks</code> increments by 1</li>
    <li>Asserts state update</li>
    <li>Tears down ArLocal testing environment<h2 id="deploy-smart-contract">Deploy smart contract</h2>
    This template has a basic counter smart contract and deploy script built in. You can deploy to local testnet or mainnet. Once your tests have passed, the contract is ready to be deployed.</li>
    </ul>
    </li>
    </ul>
    <p>For local deployment, you must run <code>npx arlocal</code> to create a slim gateway environment. This is so you have somewhere to deploy your contracts in your local environment.</p>
    <ul>
    <li>For Testnet:<ul>
    <li>In <code>.env</code> add <code>WARP=local</code></li>
    <li>Run ArLocal <code>npx arlocal</code></li>
    <li>Deploy <code>yarn deploy-contract</code></li>
    </ul>
    </li>
    <li>For Mainnet<ul>
    <li>In <code>.env</code> add <code>WARP=mainnet</code></li>
    <li>Deploy <code>yarn deploy-contract</code></li>
    </ul>
    </li>
    </ul>
    <h2 id="interact-with-smart-contract">Interact with smart contract</h2>
    <p>For basic interactions with smart contracts you need the <code>warp</code> object and contract ID. To better understand this, we will be using the test explained earlier.</p>
    <p>In the test, once deployed you get a <code>res</code> object returned after deploying, which has a <code>contractTxId</code>. The <code>contractTxId</code> is used, along with your wallet jwk, to connect to the contract using Warp Contracts.  </p>
    <pre><code>// connecting <span class="hljs-keyword">to</span> contract
    const contract = warp.contract(res.contractTxId).connect(wallet.jwk)
    
    // updating <span class="hljs-keyword">state</span> by <span class="hljs-number">1</span>
    await contract.writeInteraction({
      function: 'click'
    })
    // reading contracts recent <span class="hljs-keyword">state</span>
    const secondC<span class="hljs-literal">all</span> = await contract.readState()
    </code></pre><p>The return of <code>secondCall</code> should look similar to this:</p>
    <pre><code><span class="hljs-selector-tag">SortKeyCacheResult</span> {
      <span class="hljs-attribute">sortKey</span>: <span class="hljs-string">'000000000003,0000000000000,06a6a95eed3d2700cc03c1d1f158a4a1182f4d5b15f95dea5817a9db8fbda8a2'</span>,
      <span class="hljs-attribute">cachedValue</span>: EvalStateResult {
        <span class="hljs-attribute">state</span>: { <span class="hljs-attribute">clicks</span>: <span class="hljs-number">2</span> },
        <span class="hljs-attribute">validity</span>: {
          <span class="hljs-string">'hdvOXH9giingC8eRl-L_ogCytyDNIP8FYIkOXDc-oyA'</span>: true,
          <span class="hljs-string">'6cbdUvhjUxDPLo0yD-K596L_tuv88UQJPFy-f9AiPvY'</span>: true
        },
        <span class="hljs-attribute">errorMessages</span>: {}
      }
    }
    </code></pre><p>This can be abstracted into a UI to allow users to interact with any given contract. The <code>writeInteraction</code> function will trigger a web wallet modal for the user to sign the transaction, updating the state of the contract on mainnet, giving us the ability to build dynamic and interactive apps powered by Arweave and smart contracts.</p>
    <h2 id="deploy-app">Deploy app</h2>
    <p>Once your dApp has a UI, has been tested and you have a funded Bundlr instance, it is ready to be deployed to the Permaweb (you can deploy using <code>arkb</code>, though Bundlr makes transactions cheaper, and free if files are under 100kb). </p>
    <p>dApps deployed to Arweave do not support Server Side Rendering, so everything in your dApp must be built statically. Once everything is good to be deployed run <code>yarn build</code> to generate the static build. Once you see that you have an <code>out</code> directory in the root run <code>yarn deploy</code> to deploy it to the Permaweb. Your console will log a URL which is where your site is deployed to. It will look like this <code>https://arweave.net/TX_ID</code>. It can take up to 30 minutes to register the transaction, but usually it is quite fast.</p>
    <p>With the site deployed you can now use the Tx ID to get an <code>.arweave.dev</code> Permapage. Find out more about that at <a href="https://permapages.app" target="_blank">Permapages</a></p>
    <p>Note - If you have any images from outside URL&#39;s, add the URL to <code>next.config.js</code> like the Arweave one below.</p>
    <pre><code><span class="hljs-comment">//</span>
    <span class="hljs-attribute">images</span>: {
      <span class="hljs-attribute">domains</span>: [<span class="hljs-string">'arweave.net'</span>, <span class="hljs-string">'YOURS_HERE'</span>],
     },
    <span class="hljs-comment">//</span>
    </code></pre>`,
    tags: ['web3', 'data', 'arweave']
  },
  {
    id: 2,
    author: 'YQFGt3Z1lmPbCBUkeGD48bDNlvVXwzXFxTn253X-4Wc',
    title: 'Create ERC721 NFT collection',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ['web3', 'NFT', 'ethereum']
  },
  {
    id: 3,
    author: 'YQFGt3Z1lmPbCBUkeGD48bDNlvVXwzXFxTn253X-4Wc',
    title: 'DAO Governance',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ['web3', 'DAO']
  },
  {
    id: 4,
    author: 'xylophone.ar',
    title: 'Serverless Functions',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ['web3', 'data', 'arweave']
  },
  {
    id: 5,
    author: 'YQFGt3Z1lmPbCBUkeGD48bDNlvVXwzXFxTn253X-4Wc',
    title: 'Create ERC721 NFT collection',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ['web3', 'NFT', 'ethereum']
  },
  {
    id: 5,
    author: 'YQFGt3Z1lmPbCBUkeGD48bDNlvVXwzXFxTn253X-4Wc',
    title: 'Create ERC721 NFT collection',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ['web3', 'NFT', 'ethereum']
  },
  {
    id: 5,
    author: 'YQFGt3Z1lmPbCBUkeGD48bDNlvVXwzXFxTn253X-4Wc',
    title: 'Create ERC721 NFT collection',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ['web3', 'NFT', 'ethereum']
  },
  {
    id: 5,
    author: 'YQFGt3Z1lmPbCBUkeGD48bDNlvVXwzXFxTn253X-4Wc',
    title: 'Create ERC721 NFT collection',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ['web3', 'NFT', 'ethereum']
  },
  {
    id: 5,
    author: 'YQFGt3Z1lmPbCBUkeGD48bDNlvVXwzXFxTn253X-4Wc',
    title: 'Create ERC721 NFT collection',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ['web3', 'NFT', 'ethereum']
  },
  {
    id: 5,
    author: 'YQFGt3Z1lmPbCBUkeGD48bDNlvVXwzXFxTn253X-4Wc',
    title: 'Create ERC721 NFT collection',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ['web3', 'NFT', 'ethereum']
  },
  {
    id: 5,
    author: 'YQFGt3Z1lmPbCBUkeGD48bDNlvVXwzXFxTn253X-4Wc',
    title: 'Create ERC721 NFT collection',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ['web3', 'NFT', 'ethereum']
  },
  {
    id: 5,
    author: 'YQFGt3Z1lmPbCBUkeGD48bDNlvVXwzXFxTn253X-4Wc',
    title: 'Create ERC721 NFT collection',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ['web3', 'NFT', 'ethereum']
  },
  {
    id: 5,
    author: 'YQFGt3Z1lmPbCBUkeGD48bDNlvVXwzXFxTn253X-4Wc',
    title: 'Create ERC721 NFT collection',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ['web3', 'NFT', 'ethereum']
  },
  {
    id: 5,
    author: 'YQFGt3Z1lmPbCBUkeGD48bDNlvVXwzXFxTn253X-4Wc',
    title: 'Create ERC721 NFT collection',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ['web3', 'NFT', 'ethereum']
  },
  {
    id: 5,
    author: 'YQFGt3Z1lmPbCBUkeGD48bDNlvVXwzXFxTn253X-4Wc',
    title: 'Create ERC721 NFT collection',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ['web3', 'NFT', 'ethereum']
  },
  {
    id: 5,
    author: 'YQFGt3Z1lmPbCBUkeGD48bDNlvVXwzXFxTn253X-4Wc',
    title: 'Create ERC721 NFT collection',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ['web3', 'NFT', 'ethereum']
  },
  {
    id: 5,
    author: 'YQFGt3Z1lmPbCBUkeGD48bDNlvVXwzXFxTn253X-4Wc',
    title: 'Create ERC721 NFT collection',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ['web3', 'NFT', 'ethereum']
  },
  {
    id: 5,
    author: 'YQFGt3Z1lmPbCBUkeGD48bDNlvVXwzXFxTn253X-4Wc',
    title: 'Create ERC721 NFT collection',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ['web3', 'NFT', 'ethereum']
  },
  {
    id: 5,
    author: 'YQFGt3Z1lmPbCBUkeGD48bDNlvVXwzXFxTn253X-4Wc',
    title: 'Create ERC721 NFT collection',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ['web3', 'NFT', 'ethereum']
  },
  {
    id: 5,
    author: 'YQFGt3Z1lmPbCBUkeGD48bDNlvVXwzXFxTn253X-4Wc',
    title: 'Create ERC721 NFT collection',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ['web3', 'NFT', 'ethereum']
  },
  {
    id: 5,
    author: 'YQFGt3Z1lmPbCBUkeGD48bDNlvVXwzXFxTn253X-4Wc',
    title: 'Create ERC721 NFT collection',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: ['web3', 'NFT', 'ethereum']
  },
]