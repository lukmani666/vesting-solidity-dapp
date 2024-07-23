import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 1337, 11155111]
});

export default function useWallet() {
    const { activate, deactivate, active, account, library, connector } = useWeb3React();

    const connect = async () => {
        try {
            await activate(Injected);
            console.log("Wallet connected", { active, account, library, connector });
        } catch (error) {
            console.log("Connection error:", error);
        }
    };

    const disconnect = () => {
        deactivate();
        // alert("Deactivated:", { active, account });
    }
    return { connect, disconnect, active, account, library, connector };
}