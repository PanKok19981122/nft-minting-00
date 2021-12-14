export interface CeloAddress {
    secret: string;
    classicAddress?: string;
    address?: string;
  }
  
  export interface CeloAmount {
    value: string;
    currency: string;
  }
  
  export interface CeloAccountInfo {
    privateKey: string;
    address: string;
  }