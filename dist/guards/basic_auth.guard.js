"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicAuthGuard = void 0;
const common_1 = require("@nestjs/common");
let BasicAuthGuard = class BasicAuthGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers['authorization'];
        if (!authorizationHeader) {
            throw new common_1.UnauthorizedException('Authorization header is missing.');
        }
        const [type, credentials] = authorizationHeader.split(' ');
        if (type.toLowerCase() !== 'basic' || !credentials) {
            throw new common_1.UnauthorizedException('Invalid authorization header format.');
        }
        const [username, password] = Buffer.from(credentials, 'base64')
            .toString()
            .split(':');
        const expectedUsername = process.env.BASIC_AUTH_USERNAME || 'admin';
        const expectedPassword = process.env.BASIC_AUTH_PASSWORD || 'b5s1c+4uth';
        if (username !== expectedUsername || password !== expectedPassword) {
            throw new common_1.UnauthorizedException('Invalid credentials.');
        }
        return true;
    }
};
exports.BasicAuthGuard = BasicAuthGuard;
exports.BasicAuthGuard = BasicAuthGuard = __decorate([
    (0, common_1.Injectable)()
], BasicAuthGuard);
//# sourceMappingURL=basic_auth.guard.js.map