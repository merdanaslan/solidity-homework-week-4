"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const tokenJson = require("./assets/MyToken.json");
const ballotJson = require("./assets/TokenizedBallot.json");
const ethers_1 = require("ethers");
const dotenv = require("dotenv");
dotenv.config();
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
let AppService = class AppService {
    constructor() {
        if (!process.env.RPC_ENDPOINT_URL) {
            throw new Error('No RPC_ENDPOINT_URL provided.');
        }
        this.provider = new ethers_1.ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL);
        if (process.env.PRIVATE_KEY) {
            this.wallet = new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
        }
        else if (process.env.MNEMONIC) {
            this.wallet = ethers_1.ethers.Wallet.fromPhrase(process.env.MNEMONIC, this.provider);
        }
        else {
            throw new Error('No private key or mnemonic provided.');
        }
        this.contract = new ethers_1.ethers.Contract(TOKEN_ADDRESS, tokenJson.abi, this.wallet);
    }
    getHello() {
        return 'Hello World!';
    }
    getTokenAddress() {
        return { address: TOKEN_ADDRESS };
    }
    getTotalSupply() {
        return this.contract.totalSupply();
    }
    getTokenBalance(address) {
        return this.contract.balanceOf(address);
    }
    async mintTokens(address) {
        const tx = await this.contract.mint(address, ethers_1.ethers.parseEther('1'));
        const receipt = await tx.wait();
        console.log(JSON.stringify(receipt));
        return { success: true, txHash: receipt.hash };
    }
    async grantRole(address) {
        const tx = await this.contract.grantRole(this.contract.MINTER_ROLE(), address);
        const receipt = await tx.wait();
        return { success: true, txHash: receipt.hash };
    }
    async delegateVotes(address) {
        const tx = await this.contract.delegate(address);
        const receipt = await tx.wait();
        return { success: true, txHash: receipt.hash };
    }
    encodeProposals(proposals) {
        if (proposals.length < 2) {
            throw new Error('Need at least 2 proposals.');
        }
        return proposals.map(ethers_1.ethers.encodeBytes32String);
    }
    async deployTokenizedBallot(proposals) {
        const ballotContract = new ethers_1.ethers.ContractFactory(ballotJson.abi, ballotJson.bytecode, this.wallet);
        const blockNumber = await this.provider.getBlockNumber();
        const tx = await ballotContract.deploy(this.encodeProposals(proposals), TOKEN_ADDRESS, blockNumber);
        await tx.waitForDeployment();
        return { success: true, address: await tx.getAddress() };
    }
    async voteProposal(address, proposal, amountOfVotes) {
        const ballotContract = new ethers_1.ethers.Contract(address, ballotJson.abi, this.wallet);
        const tx = await ballotContract.vote(proposal, ethers_1.ethers.parseUnits(String(amountOfVotes)));
        const receipt = await tx.wait();
        return { success: true, txHash: receipt.hash };
    }
    async getWinningProposal(address) {
        const updatedAddress = address.slice(1);
        const ballotContract = new ethers_1.ethers.Contract(updatedAddress, ballotJson.abi, this.wallet);
        const tx = await ballotContract.proposals(await ballotContract.winningProposal());
        const proposalName = ethers_1.ethers.decodeBytes32String(tx.name);
        const votesCount = String(tx.voteCount);
        return {
            success: true,
            txHash: tx.hash,
            proposalName: proposalName,
            votesCount: votesCount,
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
//# sourceMappingURL=app.service.js.map