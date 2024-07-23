import useWallet from '../hooks/useWallet';
import Link from 'next/link';


export default function Home() {
    const { connect, disconnect, active, account } = useWallet();

    const handleConnect = async () => {
        try {
            console.log("Connecting wallet...");
            await connect()
            console.log("Connected state after connect call:", { active, account });
        } catch (error) {
            alert('Error connecting to wallet: ' + error.message);
            console.error('Error connecting to wallet:', error);
        }
    }

    console.log("Home component state", { active, account });

    const handleDisconnect = () => {
        disconnect();
        // alert("Disconnected state after disconnect call:", { active, account });
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md text-center">
                <h1 className="text-2xl font-bold mb-4">Welcome to the DApp</h1>
                {!active ? (
                    <button onClick={handleConnect} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                        Connect Wallet
                    </button>
                ) : (
                    <div>
                        <p className="mt-4 text-gray-700">Connected with {account}</p>
                        <button onClick={handleDisconnect} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 mt-4">
                            Disconnect Wallet
                        </button>
                    </div>
                )}
                {/* <button onClick={handleConnect} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                    {active ? 'Connected' : 'Connect Wallet'}
                </button>
                {active && <p className="mt-4 text-gray-700">Connected with {account}</p>} */}
                <div className="mt-8 flex gap-4">
                    <Link href="/admin">
                        <button className="block text-blue-500 hover:underline">Admin</button>
                    </Link>
                    <Link href="/withdraw">
                        <button className="block text-blue-500 hover:underline">Withdraw Tokens</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}