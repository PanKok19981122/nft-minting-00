import * as fs from 'fs'
import path from 'path'
import { InternalError } from '../core/ApiError';


const filePath = path.join(__dirname, '..', '..', 'src', 'helpers', './tokenTemplate.sol');

const tokenFormatter = (name: string, symbol: string, premint: number, securityContact: string): string => {
    let fileExists = fs.existsSync(filePath);
    if (!fileExists) {
        throw new InternalError("Token Contract Template missing");
    }

    let fileContents = fs.readFileSync(filePath, {encoding: 'utf-8'});
    fileContents = fileContents.replace("TokenName", name);
    fileContents = fileContents.replace("TokenName", name);
    fileContents = fileContents.replace("REPL", symbol);
    fileContents = fileContents.replace("mintValue", premint.toString());
    fileContents = fileContents.replace("dummyContact", securityContact);

    const newTokenContractFilePath = path.join(__dirname, '..', '..', 'src', 'helpers', './newContract.sol');
    fs.unlinkSync(newTokenContractFilePath);
    let newTokenContractFile = fs.writeFileSync(newTokenContractFilePath, fileContents);
    return fileContents;
}

export default tokenFormatter;
// tokenFormatter("TummsToken", "TKT", 555666, "tumms@io.nm");