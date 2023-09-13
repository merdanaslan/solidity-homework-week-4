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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_service_1 = require("./app.service");
const mintToken_dto_1 = require("./dtos/mintToken.dto");
const voteBallot_dto_1 = require("./dtos/voteBallot.dto");
const deployBallot_dto_1 = require("./dtos/deployBallot.dto");
const basic_auth_guard_1 = require("./guards/basic_auth.guard");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    readyz() {
        return 'OK';
    }
    getTokenAddress() {
        return this.appService.getTokenAddress();
    }
    async getTotalSupply() {
        return this.appService.getTotalSupply();
    }
    async getTokenBalance(address) {
        return this.appService.getTokenBalance(address);
    }
    async getWinningProposal(address) {
        return this.appService.getWinningProposal(address);
    }
    async mintTokens(body) {
        try {
            return await this.appService.mintTokens(body.address);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async delegateVotes(body) {
        try {
            return await this.appService.delegateVotes(body.address);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async deployTokenizedBallot(body) {
        try {
            return await this.appService.deployTokenizedBallot(body.proposals);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async grantRole(body) {
        try {
            return await this.appService.grantRole(body.address);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async voteProposal(body) {
        try {
            return await this.appService.voteProposal(body.ballotAddress, body.proposalNumber, body.amountOfVotes);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('readyz'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "readyz", null);
__decorate([
    (0, common_1.Get)('token-address'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getTokenAddress", null);
__decorate([
    (0, common_1.Get)('total-supply'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getTotalSupply", null);
__decorate([
    (0, common_1.Get)('balance/:address'),
    __param(0, (0, common_1.Param)('address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getTokenBalance", null);
__decorate([
    (0, common_1.Get)('winning-proposal/:address'),
    __param(0, (0, common_1.Param)('address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getWinningProposal", null);
__decorate([
    (0, common_1.Post)('mint-tokens'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mintToken_dto_1.MintTokensDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "mintTokens", null);
__decorate([
    (0, common_1.Post)('delegate'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mintToken_dto_1.MintTokensDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "delegateVotes", null);
__decorate([
    (0, common_1.Post)('deploy-ballot'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deployBallot_dto_1.DeployBallotDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deployTokenizedBallot", null);
__decorate([
    (0, swagger_1.ApiBasicAuth)(),
    (0, common_1.Post)('grant-role'),
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mintToken_dto_1.MintTokensDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "grantRole", null);
__decorate([
    (0, swagger_1.ApiBasicAuth)(),
    (0, common_1.Post)('vote-proposal'),
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [voteBallot_dto_1.VoteBallotDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "voteProposal", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map