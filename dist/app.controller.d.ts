import { AppService } from './app.service';
import { MintTokensDto } from './dtos/mintToken.dto';
import { VoteBallotDto } from './dtos/voteBallot.dto';
import { DeployBallotDto } from './dtos/deployBallot.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    readyz(): string;
    getTokenAddress(): any;
    getTotalSupply(): Promise<bigint>;
    getTokenBalance(address: string): Promise<bigint>;
    getWinningProposal(address: string): Promise<any>;
    mintTokens(body: MintTokensDto): Promise<{
        success: boolean;
        txHash: any;
    }>;
    delegateVotes(body: MintTokensDto): Promise<{
        success: boolean;
        txHash: any;
    }>;
    deployTokenizedBallot(body: DeployBallotDto): Promise<{
        success: boolean;
        address: string;
    }>;
    grantRole(body: MintTokensDto): Promise<{
        success: boolean;
        txHash: any;
    }>;
    voteProposal(body: VoteBallotDto): Promise<{
        success: boolean;
        txHash: any;
    }>;
}
