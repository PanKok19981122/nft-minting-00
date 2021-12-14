import ContractKit, { newKitFromWeb3 } from "@celo/contractkit";
import * as dotenv from "dotenv";
import axios from "axios";
import Web3 from "web3";
import { CeloAccountInfo } from "../types/celoAccount";
import { BadRequestError } from "../core/ApiError";

dotenv.config();
const { DefenderRelayProvider } = require("defender-relay-client/lib/web3");

class TransactionsService {
    public static async getTransactions(address: string) {
        const web3 = <any>new Web3("https://alfajores-forno.celo-testnet.org");
        const kit = newKitFromWeb3(web3);

        const currentBlock = await kit.connection.getBlockNumber();
        let transactionCount = await kit.connection.getTransactionCount(address);
        let balance = Number(await kit.connection.getBalance(address, currentBlock));

        let transactions = [];
        for (let i = currentBlock; i >= 0 && (transactionCount > 0 || balance > 0); --i) {
            try {
                const block = <any>await kit.connection.getBlock(i, true);
                if (block && block.transactions) {
                    for (const trx of block.transactions) {
                        if (address === trx.from) {
                            if (trx.from !== trx.to) balance = balance + trx.value;
                            transactions.push(trx);
                            --transactionCount;
                        } else if (address == trx.to) {
                            if (trx.from !== trx.to) balance = balance - trx.value;
                            transactions.push(trx);
                        }
                    }
                }
            } catch (e) {
                throw new BadRequestError("Unable to get all transactions");
            }
        }

        return transactions;
    }

    public static async getTransactionsViaAPI(address: string) {
        try {
            const response = await axios.get(`https://alfajores-blockscout.celo-testnet.org/api?module=account&action=txlist&address=${address}`);

            if (response.data.message === "OK") return response.data.result;

            throw new BadRequestError("Unable to get all transactions");
        } catch (err) {
            console.log(err);
            throw new BadRequestError("Unable to get all transactions");
        }
    }

    public static async getTransaction(id: string) {
        const web3 = <any>new Web3("https://alfajores-forno.celo-testnet.org");
        const kit = newKitFromWeb3(web3);

        return await kit.connection.getTransaction(id);
    }

    public static async sendCelo(account: CeloAccountInfo, recipient: string, amount: number) {
        const web3 = <any>new Web3("https://alfajores-forno.celo-testnet.org");
        const kit = ContractKit.newKitFromWeb3(web3);
        kit.connection.addAccount(account.privateKey);
        let goldtoken = await kit.contracts.getGoldToken();

        let celotx = await goldtoken.transfer(recipient, amount).send({ from: account.address });

        let celoReceipt = await celotx.waitReceipt();
    }

    public static async metaTransaction(tokenRequest: metaTransactionRequest): Promise<string> {
        const credentials = { apiKey: process.env.RELAY_API_KEY, apiSecret: process.env.RELAY_API_SECRET };
        const provider = new DefenderRelayProvider(credentials, { speed: "fast" });
        const web3 = new Web3(provider);
        const from = (await web3.eth.getAccounts())[0];
        const tokenContract = await new web3.eth.Contract(JSON.parse(tokenRequest.abi), tokenRequest.contractAddress, { from: from });
        let txHash = await tokenContract.methods.mint(tokenRequest.recipient, tokenRequest.amount).send();
        return txHash;
    }
}

interface metaTransactionRequest {
    contractAddress: string;
    recipient: string;
    amount: number;
    abi: string;
}

export default TransactionsService;