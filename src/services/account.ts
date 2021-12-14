import * as Web3C from "web3";
import * as Ck from "@celo/contractkit";

class Account {
  public static async generateAddress() {
    const web3 = new Web3C.default();
    const newAccount = await web3.eth.accounts.create();
    console.log("Account Obj", newAccount);
    return newAccount;
  }

  // TODO: Will extend this to custom issued tokens in the future. This requires custom smart contracts deployed to the Celo blockchain
  public static async getBalances(address: string) {
    const web3Instance = <any>new Web3C.default("https://alfajores-forno.celo-testnet.org");
    const kit = Ck.newKitFromWeb3(web3Instance);
    let goldtoken = await kit.contracts.getGoldToken();
    let stabletoken = await kit.contracts.getStableToken();

    let celoBalance = await goldtoken.balanceOf(address);
    let cUSDBalance = await stabletoken.balanceOf(address);

    return {
      celoBalance,
      cUSDBalance
    };
  }

  public static async getTokenBalances(walletAddress: string, contractAddress: string) {
    const web3Instance = <any>new Web3C.default('https://alfajores-forno.celo-testnet.org');
    const kit = Ck.newKitFromWeb3(web3Instance);

    const goldContract = await kit.contracts.getContract(Ck.CeloContract.GoldToken, contractAddress);
    const celoBalance = <any> await goldContract.balanceOf(walletAddress);

    const stableToken = await kit.contracts.getContract(Ck.CeloContract.StableToken, contractAddress);
    const cUSDBalance = <any> await stableToken.balanceOf(walletAddress);

    return { celoBalance, cUSDBalance }
  }

  public static async getAccountInfo(address: string) {
    return "Celo Account Info";
  }
}

export default Account;
