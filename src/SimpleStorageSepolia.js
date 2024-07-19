import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./SimpleStorage.abi.json";

const contractAddress = process.env.REACT_APP_SEPOLIA_CONTRACT; // Change to your contract address

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
      <p>Current Value: {storageValue}</p>
      <input
        type="text"
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
      />
      <button onClick={handleSetValue}>Set Value</button>
      <button onClick={handleGetValue}>Get Value</button>
    </div>
  );
};

export default SimpleStorage;
