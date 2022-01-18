import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

  // Check is if wallet is connected
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    const { solana } = window;
    try {
      if(solana){
        if (solana.isPhantom) {
          console.log("Phantom wallet found");
          const response = await solana.connect({onlyIfTrusted: true})
          console.log("Connected with ", response.publicKey.toString())

          setWalletAddress(response.publicKey.toString())
        }
      }
      else {
        alert("Solana wallet not found, get a wallet")
      }
    } catch (error) {
      console.error(error)
      
    }
  }

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected(); 
    }


    // use this event listener to make sure we wait
    // for the window to finish loading.

    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad)

  }, [])


  const connectToWallet = async() => {
    const {solana} = window;
    try {
      
      const response = await solana.connect();
      console.log('Connected to solana wallet with public key ', response.publicKey.toString())
      setWalletAddress(response.publicKey.toString())
    } catch (error) {
      
    }
  }

  const renderNotConnectedButton = () => {
    return (
      <button
      className="cta-button connect-wallet-button"
      onClick={connectToWallet}
      >
        Connect To Wallet
      </button>
    )
  }

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {!walletAddress && renderNotConnectedButton()}
        </div>
        {walletAddress && <CandyMachine walletAddress={window.solana.walletAddress} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
