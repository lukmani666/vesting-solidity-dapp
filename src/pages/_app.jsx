import '../styles/global.css';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';

function getLibrary(provider) {
    return new ethers.BrowserProvider(provider);
}

export default function App({ Component, pageProps }) {
    
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Component {...pageProps} />
        </Web3ReactProvider>
    );
}