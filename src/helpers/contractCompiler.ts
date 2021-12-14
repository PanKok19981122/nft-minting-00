const solc = require('solc');
import path from 'path';
import fs from 'fs';

function findImports(pathToC: string) {
    if (pathToC)
        return {
            contents:
                fs.readFileSync(path.join(__dirname, '..', '..', 'src', 'helpers', pathToC), { encoding: 'utf-8' })
        };
    else return { error: 'File not found' };
}

const compiler = async (contractName: string): Promise<CompiledContractOutput> => {

    const newTokenContractFilePath = path.join(__dirname, '..', '..', 'src', 'helpers', './newContract.sol');
    const newTokenContract = fs.readFileSync(newTokenContractFilePath, { encoding: 'utf-8' });
    const input = {
        language: 'Solidity',
        sources: {
            'newContract.sol': {
                content: newTokenContract
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    };

    const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));
    console.log("OUTPUT", output);
    const abi = output.contracts['newContract.sol'][`${contractName}`].abi;
    const bytecode = output.contracts['newContract.sol'][`${contractName}`].evm.bytecode.object;

    return { abi, bytecode };


    // const res = await solc.compile(newTokenContract, 1).contracts[`:${name}`];
    // console.log("RES", res);
}
// comp("DAvE Tok")

export default compiler;
export interface CompiledContractOutput {
    abi: string;
    bytecode: string;
}
