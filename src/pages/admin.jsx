import { useState } from 'react';
import { ethers } from 'ethers';
import Vesting from '../../artifacts/contracts/Vesting.sol/Vesting.json';
import OrganizationToken from '../../artifacts/contracts/OrganizationToken.sol/OrganizationToken.json';
import Link from 'next/link';

export default function Admin() {
    const [ orgName, setOrgName ] = useState('');
    const [ orgSymbol, setOrgSymbol ] = useState('');
    const [ intialSupply, setInitialSupply ] = useState('');
    const [vestingContractAddress, setVestingContractAddress] = useState('');
    const [ stakeholderAddress, setStakeholderAddress ] = useState('');
    const [ stakeholderAmount, setStakeholderAmount ] = useState('');
    const [ releaseTime, setReleaseTime ] = useState('');
    const [ loading, setLoading ] = useState();

    const handleCreateOrg = async () => {
        setLoading(true);
        try {

            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = provider.getSigner();
                const factory = new ethers.ContractFactory(
                    OrganizationToken.abi,
                    OrganizationToken.bytecode,
                    signer
                );
    
                const contract = await factory.deploy(orgName, orgSymbol, ethers.parseUnits(intialSupply, 18));
                await contract.deployed();
                alert("Organization Token deployed at: " + contract.address);
                console.log("Organization Token deployed at:", contract.address);
    
            } else {
                alert("Ethereum object not found. Install MetaMask.");
            }
        } catch (error) {
            alert("Error in handleCreateOrg: " + error.message);
            console.error("Error in handleCreateOrg:", error);
        } finally {
            setLoading(false)
        }
    };

    
    const handleAddStakeholder = async () => {
        setLoading(true)
        try {

            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = provider.getSigner();
                const vestingContract = new ethers.Contract(vestingContractAddress, Vesting.abi, signer)
    
                await vestingContract.addStakeholder(stakeholderAddress, ethers.parseUnits(stakeholderAmount, 18), releaseTime);
                alert('Stakeholder added');
                console.log('Stakeholder added');
            } else {
                alert("Ethereum object not found. Install MetaMask.");
            }
        } catch (error) {
            alert("Error in handleAddStakeholder: " + error.message);
            console.error("Error in handleAddStakeholder:", error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Register Organization</h2>
                <input 
                    value={orgName}
                    type="text" 
                    placeholder="Organization Name"
                    onChange={e => setOrgName(e.target.value)}
                    className="placeholder:italic w-full mb-4 p-2 border rounded"
                    aria-label="Organization Name"
                />
                <input
                    value={orgSymbol}
                    type='text'
                    placeholder="Organization Symbol"
                    onChange={e => setOrgSymbol(e.target.value)}
                    className="placeholder:italic w-full mb-4 p-2 border rounded"
                    aria-label="Organization Symbol"
                />
                <input
                    value={intialSupply}
                    type='text'
                    placeholder="Initial Supply"
                    onChange={e => setInitialSupply(e.target.value)}
                    className="placeholder:italic w-full mb-4 p-2 border rounded"
                    aria-label="Initial Supply"
                />
                <button
                    onClick={handleCreateOrg}
                    className={`w-full px-4 py-2 bg-green-500 text-white 
                        rounded hover:bg-green-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Organization'}
                </button>

                <h2 className="text-2xl font-bold mt-8 mb-6">Add Stakeholder</h2>
                <input
                    value={stakeholderAddress}
                    type='text'
                    placeholder="Stakeholder Address"
                    onChange={e => setStakeholderAddress(e.target.value)}
                    className="placeholder:italic w-full mb-4 p-2 border rounded"
                />
                <input
                    type='number'
                    value={stakeholderAmount}
                    placeholder="Amount"
                    onChange={e => setStakeholderAmount(e.target.value)}
                    className="placeholder:italic w-full mb-4 p-2 border rounded"
                />
                <input
                    value={releaseTime}
                    type='datetime-local'
                    placeholder="Release Time"
                    onChange={e => setReleaseTime(e.target.value)}
                    className="placeholder:italic w-full mb-4 p-2 border rounded"
                />
                <button
                    onClick={handleAddStakeholder}
                    className={`placeholder:italic w-full px-4 py-2 bg-blue-500 text-white
                     rounded hover:bg-blue-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Adding...' : 'Add Stackholder'}
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