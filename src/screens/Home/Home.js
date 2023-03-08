import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import "./style.css";

const Home = () => {
  const [address, setAddress] = useState("null");
  const [balance, setBalance] = useState("null");
  const { ethereum } = window;

  const connectWallet = async () => {
    try {
      if (ethereum) {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(accounts[0]);

        const provider = new ethers.BrowserProvider(ethereum);
        const balance = await provider.getBalance(accounts[0]);
        const bal = ethers.formatEther(balance);
        setBalance(bal);
      } else {
        alert("Please Install Meta mask Browser Extension");
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    if (ethereum) {
      connectWallet();
    }
  }, []);

  return (
    <div className="mainContainer">
      <div className="innerContainer">
        <div>
          <p>Address: {address}</p>
          <p>Balance: {balance} ETH</p>
        </div>
        <div className="buttonContainer">
          <button className="btn" onClick={connectWallet}>
            Connect ETH
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
