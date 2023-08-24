import { ethers } from "ethers";

let connectedAccount: string;
let provider: ethers.providers.Web3Provider;
let signature: string;

interface ConnectionParams {
  isEdit?: boolean;
  pid?: number;
}

async function connectToMetaMask({ isEdit, pid }: ConnectionParams) {
  if (window.ethereum) {
    // await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    connectedAccount = await signer.getAddress();
    try {
      await requestSignature(isEdit, pid);
    } catch (err) {
      console.log(err);
      return;
    }
  } else {
    alert("You need to install metamask");
  }
}

async function requestSignature({ isEdit, pid }: ConnectionParams) {
  try {
    const signer = provider.getSigner();
    signature = await signer.signMessage(
      `Sign to ${isEdit ? "edit" : "create"} post ${pid !== -1 ? pid : ""}`
    );
    return { signature, connectedAccount };
  } catch (error) {
    console.error("Error while requesting signature:", error);
    return;
  }
}

export default connectToMetaMask