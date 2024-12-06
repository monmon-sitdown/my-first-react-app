import React, { useState, useEffect } from "react";

import { ethers } from "ethers";

const abi = require("./SimpleStorage.abi.json");

const contractAddress = process.env.REACT_APP_GANACHE_CONTRACT;

//const provider = new ethers.providers.Web3Provider(window.ethereum);

const provider = new ethers.providers.JsonRpcProvider(
  process.env.REACT_APP_GANACHE_URL
);

const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, abi, signer);

const SimpleStorage = () => {
  const [storageValue, setStorageValue] = useState("");

  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    const fetchValue = async () => {
      const value = await contract.getStoredNumber();

      setStorageValue(value.toString());
    };

    fetchValue();
  }, []);

  const handleGetValue = async () => {
    const value = await contract.getStoredNumber();

    setStorageValue(value.toString());
  };

  const handleSetValue = async () => {
    const tx = await contract.setNumber(newValue);

    await tx.wait();

    await handleGetValue();
  };

  return (
    <div>
      <p>Current Value：{storageValue}</p>

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
