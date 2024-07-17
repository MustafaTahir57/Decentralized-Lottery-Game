import React, { useEffect, useState } from 'react'
import {
    useWeb3ModalAccount,
    createWeb3Modal,
    defaultConfig,
  } from "@web3modal/ethers/react";

  const projectId = "57c3ed3f7633af987eda789d503edfee";
const chains = [
  {
    chainId: 56,
    name: "Binance smart chain",
    currency: "BNB",
    explorerUrl: "https://bscscan.com",
    rpcUrl: "https://bsc-dataseed1.binance.org",
  }
];

const ethersConfig = defaultConfig({
  
  metadata: {
    name: "Web3Modal",
    description: "Web3Modal Laboratory",
    url: "https://web3modal.com",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  },
  defaultChainId: 1,
  rpcUrl: "https://cloudflare-eth.com",
});
createWeb3Modal({
  ethersConfig,
  chains,
  projectId,
  enableAnalytics: true,
//   themeMode: "dark",
  themeVariables: {
    "--w3m-accent": "#0f172a",
    '--w3m-color-mix': '#fff',
  }
});
const ConnectWallet = ({setConnection,setModalShow}) => {
    const { address, disconnect } = useWeb3ModalAccount();
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [hasAddressEverBeenSet, setHasAddressEverBeenSet] = useState(false);
  
    useEffect(() => {
      if (address) {
        setHasAddressEverBeenSet(true);
        setConnection(address);
        const modalShown = localStorage.getItem('modalShown');
        if (!modalShown) {
          setModalShow(true);
          localStorage.setItem('modalShown', 'true');
        }
        setIsInitialLoad(false);
      } else if (hasAddressEverBeenSet) {
        localStorage.removeItem('modalShown');
      }
    }, [address, hasAddressEverBeenSet, setConnection, setModalShow]);
  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', borderRadius: '25px' }}>
    <w3m-button></w3m-button>
</div>
  )
}

export default ConnectWallet