import { ethers } from 'ethers';
export declare class AppService {
    provider: ethers.Provider;
    wallet: ethers.Wallet | ethers.HDNodeWallet;
    contract: ethers.Contract;
    ballotContract: ethers.Contract;
    constructor();
    getHello(): string;
    getTokenAddress(): {
        address: string;
    };
    getTotalSupply(): Promise<bigint>;
    getTokenBalance(address: string): Promise<bigint>;
    mintTokens(address: string): Promise<{
        success: boolean;
        txHash: any;
    }>;
    grantRole(address: string): Promise<{
        success: boolean;
        txHash: any;
    }>;
    delegateVotes(address: string): Promise<{
        success: boolean;
        txHash: any;
    }>;
    encodeProposals(proposals: string[]): string[];
    deployTokenizedBallot(proposals: string[]): Promise<{
        success: boolean;
        address: string;
    }>;
    voteProposal(address: string, proposal: number, amountOfVotes: number): Promise<{
        success: boolean;
        txHash: any;
    }>;
    getWinningProposal(address: string): Promise<{
        success: boolean;
        txHash: any;
        proposalName: string;
        votesCount: string;
    }>;
}
