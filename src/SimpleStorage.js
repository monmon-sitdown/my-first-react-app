import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./SimpleStorage.abi.json";

const contractAddress = "0x5327d271a06625FA7f966Def9A39fd10723855F6"; // The deployed contract address

const SimpleStorage = () => {
  const [storageValue, setStorageValue] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    const fetchValue = async () => {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        try {
          const value = await contract.getStoredNumber();
          setStorageValue(value.toString());
        } catch (error) {
          console.error("Error fetching value:", error);
        }
      }
    };

    fetchValue();
  }, []);

  const handleGetValue = async () => {
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        const value = await contract.getStoredNumber();
        setStorageValue(value.toString());
      } catch (error) {
        console.error("Error fetching value:", error);
      }
    }
  };

  const handleSetValue = async () => {
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        const tx = await contract.setNumber(newValue);
        await tx.wait();
        await handleGetValue();
      } catch (error) {
        console.error("Error setting value:", error);
      }
    }
  };

  return (
    <div>
      <p
        style={{
          maxWidth: "950px",
          marginBottom: "20px",
          fontSize: "18px",
          color: "#adacac",
          textAlign: "justify",
        }}
      >
        This is a decentralized application (DApp) that allows users to store
        and retrieve a value on the Ethereum blockchain. This smart contract has
        been deployed on the Sepolia test network. The 《Current Value》
        displayed shows the number currently stored in the contract. When the
        user wishes to modify the number, they can enter the desired number in
        the text box and click 《Set Value》. The webpage will then attempt to
        connect to the user's Web3 wallet (such as MetaMask) on the ETH Sepolia
        network. After a successful connection, the user can pay the gas fee and
        store the new number. After a moment, the new number entered by the user
        will be displayed in the 《Current Value》 section.
      </p>

      <p>Current Value: {storageValue}</p>
      <input
        type="text"
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
      />
      <button onClick={handleSetValue}>Set Value</button>
    </div>
  );
};

export default SimpleStorage;
