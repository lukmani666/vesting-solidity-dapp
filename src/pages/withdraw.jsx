import { useState } from 'react';
import { ethers } from 'ethers';
import Vesting from '../../artifacts/contracts/Vesting.sol/Vesting.json';
import Link from 'next/link';

export default function Withdraw() {
  const [vestingContractAddress, setVestingContractAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  const handleWithdraw = async () => {
    if (!ethers.isAddress(vestingContractAddress)) {
      setError('Invalid contract address');
      return;
    }

    if (typeof window.ethereum !== 'undefined') {
      setLoading(true);
      setError(null);
      try {

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        const vestingContract = new ethers.Contract(vestingContractAddress, Vesting.abi, signer);
  
        await vestingContract.withdrawTokens();
        console.log('Tokens withdrawn');
      } catch (err) {
        console.error(err);
        setError('An error occurred while withdrawing tokens');
      } finally {
        setLoading(false)
      } 
    } else {
      setError('Ethereum provider not found')
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Withdraw Tokens</h2>
        {error && <div className='md-4 text-red-500'>{error}</div>}
        <input
          value={vestingContractAddress}
          placeholder="Vesting Contract Address"
          onChange={e => setVestingContractAddress(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          onClick={handleWithdraw}
          className={`w-full px-4 py-2 bg-red-500 text-white rounded
           hover:bg-red-600 transition duration-200 ${loading ? 'bg-gray-500' : 'bg-red-500'}`}
          disabled={loading}
        >
          {loading ? 'Withdrawing...' : 'Withdraw Token'}
        </button>
        <div className="mt-8">
          <Link href="/">
            <button className="block text-blue-500 hover:underline">Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}