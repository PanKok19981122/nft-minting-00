import path from 'path';
import fs from 'fs';
import tokenFormatter from '../helpers/tokenTemplateFormatter';
import Web3 from 'web3';
import compiler from '../helpers/contractCompiler';
import * as dotenv from 'dotenv';
dotenv.config();
const solc = require('solc');
import HDWalletProvider from '@truffle/hdwallet-provider';
import { Transaction } from "ethereumjs-tx";
import { DefenderRelayProvider } from 'defender-relay-client/lib/web3';
import { RelayerParams } from 'defender-relay-client';

class TokenService {
  static getHotAddressBalances() {
    throw new Error('Method not implemented.');
  }
  static getColdAddressBalances() {
    throw new Error('Method not implemented.');
  }

  public static async burnToken(tokenRequest: BurnTokenRequest): Promise<string> {
    /* const provider = new HDWalletProvider(
      'stumble service clutch sphere brother remember unit distance target deputy snake athlete',
      'https://alfajores-forno.celo-testnet.org'
    );
    const web3 = new Web3(provider);
    const deploymentAccount = web3.eth.accounts.privateKeyToAccount(tokenRequest.contractOwnerPK);
    const tokenContract = await new web3.eth.Contract(JSON.parse(tokenRequest.abi), tokenRequest.contractAddress);
    let txHash = await tokenContract.methods.burn(tokenRequest.amount).send({ from: (await web3.eth.getAccounts())[0] });
    return txHash; */

    const credentials = { apiKey: process.env.RELAY_API_KEY, apiSecret: process.env.RELAY_API_SECRET } as RelayerParams;
    const provider = new DefenderRelayProvider(credentials, { speed: "fast" });
    const web3 = new Web3(provider);
    const from = (await web3.eth.getAccounts())[0];
    const tokenContract = await new web3.eth.Contract(JSON.parse(tokenRequest.abi), tokenRequest.contractAddress, { from: from });
    const  txHash = await tokenContract.methods.burn(tokenRequest.amount).send();
    return txHash;
  }


  public static async mintToken(tokenRequest: MintTokenRequest): Promise<string> {
    /* const provider = new HDWalletProvider(
      'stumble service clutch sphere brother remember unit distance target deputy snake athlete',
      'https://alfajores-forno.celo-testnet.org'
    );
    const web3 = new Web3(provider);
    const deploymentAccount = web3.eth.accounts.privateKeyToAccount(tokenRequest.contractOwnerPK);
    const tokenContract = await new web3.eth.Contract(JSON.parse(tokenRequest.abi), tokenRequest.contractAddress);
    let txHash = await tokenContract.methods.mint(tokenRequest.recipient, tokenRequest.amount).send({ from: (await web3.eth.getAccounts())[0] });
    return txHash; */
    
    const credentials = { apiKey: process.env.RELAY_API_KEY, apiSecret: process.env.RELAY_API_SECRET } as RelayerParams;
    const provider = new DefenderRelayProvider(credentials, { speed: "fast" });
    const web3 = new Web3(provider);
    const from = (await web3.eth.getAccounts())[0];
    const tokenContract = await new web3.eth.Contract(JSON.parse(tokenRequest.abi), tokenRequest.contractAddress, { from: from });
    const txHash = await tokenContract.methods.mint(tokenRequest.recipient, tokenRequest.amount).send();
    return txHash;
  }


  /* public static async sendToken(tokenRequest: SendTokenRequest): Promise<any> {
    // const provider = new HDWalletProvider(
    //   'stumble service clutch sphere brother remember unit distance target deputy snake athlete',
    //   'https://alfajores-forno.celo-testnet.org'
    // );
    
    const web3 = new Web3('https://alfajores-forno.celo-testnet.org');

    const senderAccount = web3.eth.accounts.privateKeyToAccount(tokenRequest.senderPK);
    const tokenContract = await new web3.eth.Contract(JSON.parse(tokenRequest.abi), tokenRequest.contractAddress);
    // let txHash = await tokenContract.methods.transfer(tokenRequest.recipient, tokenRequest.amount).send({ from: senderAccount.address });
    let txHash;
    let method = tokenContract.methods.transfer(tokenRequest.recipient, tokenRequest.amount);
    const encoded = method.encodeABI();

    const tx = {
      to : tokenRequest.contractAddress,
      data : encoded,
      gas: await method.estimateGas({ from: senderAccount.address }),
      gasPrice: await web3.eth.getGasPrice(),
    }

    const signedTransaction = await web3.eth.accounts.signTransaction(tx, senderAccount.privateKey);
    txHash = await web3.eth.sendSignedTransaction(<any>signedTransaction.rawTransaction);
    return txHash; 
  } */

  public static async sendToken(tokenRequest: SendTokenRequest): Promise<any> {

    const credentials = { apiKey: process.env.RELAY_API_KEY, apiSecret: process.env.RELAY_API_SECRET } as RelayerParams;
    const provider = new DefenderRelayProvider(credentials, { speed: "fast" });
    
    const web3 = new Web3(provider);

    const from = (await web3.eth.getAccounts())[0];
    
    const tokenContract = await new web3.eth.Contract(JSON.parse(tokenRequest.abi), tokenRequest.contractAddress, { from: from });
    
    const txHash = await tokenContract.methods.transfer(tokenRequest.recipient, tokenRequest.amount).send();
   
    return txHash; 
  }

  public static async issueToken(tokenRequest: IssueTokenRequest): Promise<any> {
    tokenFormatter(tokenRequest.tokenName, tokenRequest.tokenSymbol, tokenRequest.issueQuantity, tokenRequest.securityContact);

    const { abi, bytecode } = await compiler(tokenRequest.tokenName);

    const provider = new HDWalletProvider({
      privateKeys: [tokenRequest.contractOwnerPK],
      providerOrUrl: 'https://alfajores-forno.celo-testnet.org'
    });
    const web3 = new Web3(provider);

    // const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
    // const deploymentAccount = web3.eth.accounts.privateKeyToAccount(tokenRequest.contractOwnerPK); //accounts.privateKeyToAccount(tokenRequest.contractOwnerPK);
    const deploymentAccount = (await web3.eth.getAccounts())[0];

    const deployedContract = await new web3.eth.Contract(JSON.parse(JSON.stringify(abi)))
      .deploy({ data: '0x' + bytecode })
      .send({ from: deploymentAccount });

    return { 
      address: deployedContract.options.address,
      abi
    }
  }

  public static async feeLessToken(tokenRequest: IssueTokenRequest): Promise<any> {
    tokenFormatter(tokenRequest.tokenName, tokenRequest.tokenSymbol, tokenRequest.issueQuantity, tokenRequest.securityContact);

    const { abi, bytecode } = await compiler(tokenRequest.tokenName);

    const credentials = { apiKey: process.env.RELAY_API_KEY, apiSecret: process.env.RELAY_API_SECRET } as RelayerParams;
    const provider = new DefenderRelayProvider(credentials, { speed: 'fast' });
    const web3 = new Web3(provider);
    const from = (await web3.eth.getAccounts())[0];
    // const web3 = new Web3('https://alfajores-forno.celo-testnet.org');

    console.log(from);

    const deployedContract = await new web3.eth.Contract(JSON.parse(JSON.stringify(abi)))
      .deploy({ data: '0x' + bytecode })
      .send({ from: from });
    console.log(deployedContract.options.address);

    return { address: deployedContract.options.address, abi };
  }
}

interface IssueTokenRequest {
  tokenName: string;
  tokenSymbol: string;
  issueQuantity: number;
  securityContact: string;
  contractOwnerPK: string;
}

interface BurnTokenRequest {
  amount: number;
  contractAddress: string;
  contractOwnerPK: string;
  abi: string;
}

interface MintTokenRequest {
  amount: number;
  contractAddress: string;
  contractOwnerPK: string;
  recipient: string;
  abi: string;
}

interface SendTokenRequest {
  contractAddress: string;
  senderPK: string;
  recipient: string;
  amount: number;
  abi: string;
}
export default TokenService;