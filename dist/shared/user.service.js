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
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    sanitizerUser(user) {
        return user.depopulate('password');
    }
    async create(userDTO) {
        const { username } = userDTO;
        const user = await this.userModel.findOne({ username });
        if (user) {
            throw new common_2.HttpException('User already exist', common_1.HttpStatus.BAD_REQUEST);
        }
        const createUser = new this.userModel(userDTO);
        await createUser.save();
        return this.sanitizerUser(createUser);
    }
    async findByLogin(userDTO) {
        const { username, password } = userDTO;
        const user = await this.userModel.findOne({ username });
        if (!user) {
            throw new common_2.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        console.log(user.password);
        if (await bcrypt.compare(password, user.password, null)) {
            return this.sanitizerUser(user);
        }
        else {
            throw new common_2.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async findByPayload(payload) {
        const { username } = payload;
        return await this.userModel.findOne({ username });
    }
};
UserService = __decorate([
    common_2.Injectable(),
    __param(0, mongoose_2.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map