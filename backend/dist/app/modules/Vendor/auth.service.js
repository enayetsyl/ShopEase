"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const emailSender_1 = __importDefault(require("../../../helpers/emailSender"));
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check user exist with email
    // hash password
    // save user
    // create vender/customer
    const { name, email, password, role } = payload;
    const existingUser = yield prisma_1.default.user.findUnique({
        where: {
            email
        }
    });
    if (existingUser) {
        throw new ApiError_1.default(400, "User with this email already exists");
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    return yield prisma_1.default.$transaction((p) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield p.user.create({
            data: {
                name, email, password: hashedPassword, role
            }
        });
        if (role === "VENDOR") {
            yield p.vendor.create({
                data: {
                    name,
                    email: newUser.email
                },
            });
        }
        else if (role === "CUSTOMER") {
            yield p.customer.create({
                data: {
                    name, email
                }
            });
        }
        // Exclude the password from the response
        const { password: _ } = newUser, userWithoutPassword = __rest(newUser, ["password"]);
        return userWithoutPassword;
    }));
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    // find user
    // check whether password correct
    // generate access and refresh token 
    // return data
    const { email, password } = payload;
    const user = yield prisma_1.default.user.findUnique({
        where: { email }, include: {
            vendor: true,
            customer: true,
        },
    });
    if (!user)
        throw new ApiError_1.default(404, "User Not Found");
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid)
        throw new ApiError_1.default(401, "Invalid Credentials.");
    if (user.role === "VENDOR" && (((_a = user.vendor) === null || _a === void 0 ? void 0 : _a.isDeleted) || ((_b = user.vendor) === null || _b === void 0 ? void 0 : _b.isSuspended)))
        throw new ApiError_1.default(403, "Vendor account is suspended or deleted. ");
    if (user.role === "CUSTOMER" && (((_c = user.customer) === null || _c === void 0 ? void 0 : _c.isDeleted) || ((_d = user.customer) === null || _d === void 0 ? void 0 : _d.isSuspended)))
        throw new ApiError_1.default(403, "Customer account is suspended or deleted. ");
    const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
    const accessToken = jwtHelpers_1.jwtHelpers.generateToken(userWithoutPassword, config_1.default.jwt.jwt_secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.generateToken(userWithoutPassword, config_1.default.jwt.refresh_token_secret, config_1.default.jwt.refresh_token_expires_in);
    return {
        accessToken, refreshToken, userWithoutPassword
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // find user
    // check old password
    // hash new password
    // update new password
    const { newPassword, oldPassword } = payload;
    const { id, email } = user;
    const userData = yield prisma_1.default.user.findUnique({
        where: { email }
    });
    if (!userData)
        throw new ApiError_1.default(404, "User Not Found");
    const isPasswordValid = yield bcrypt_1.default.compare(oldPassword, userData.password);
    if (!isPasswordValid)
        throw new ApiError_1.default(401, "Invalid Credentials.");
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
    yield prisma_1.default.user.update({
        where: { email: userData.email },
        data: {
            password: hashedPassword,
        }
    });
    return;
});
const forgotPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    // get email
    // find user
    // generate token
    // generate link
    // send email
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email: payload.email
        }, include: {
            vendor: true,
            customer: true
        }
    });
    if (!user)
        throw new ApiError_1.default(404, "User Not Found");
    if (user.role === "VENDOR" && (((_a = user.vendor) === null || _a === void 0 ? void 0 : _a.isDeleted) || ((_b = user.vendor) === null || _b === void 0 ? void 0 : _b.isSuspended)))
        throw new ApiError_1.default(403, "Vendor account is suspended or deleted. ");
    if (user.role === "CUSTOMER" && (((_c = user.customer) === null || _c === void 0 ? void 0 : _c.isDeleted) || ((_d = user.customer) === null || _d === void 0 ? void 0 : _d.isSuspended)))
        throw new ApiError_1.default(403, "Customer account is suspended or deleted. ");
    const resetPasswordToken = jwtHelpers_1.jwtHelpers.generateToken({ email: user.email, role: user.role }, config_1.default.jwt.reset_pass_secret, config_1.default.jwt.reset_pass_token_expires_in);
    const resetPasswordLink = config_1.default.reset_pass_link + `userId=${user.id}&token=${resetPasswordToken}`;
    yield (0, emailSender_1.default)(user.email, `
    <div>
    <p>Dear ${user.name}</p>
    <p> Your password reset link 
    <a href=${resetPasswordLink}>
    <button>Reset Password</button>
    </a>
    </p>
    </div>
    `);
});
const resetPassword = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    // find user with email
    // verify token
    // hash password
    // update password
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: payload.id
        }, include: {
            vendor: true, customer: true
        }
    });
    if (!user)
        throw new ApiError_1.default(404, "User Not Found");
    if (user.role === "VENDOR" && (((_a = user.vendor) === null || _a === void 0 ? void 0 : _a.isDeleted) || ((_b = user.vendor) === null || _b === void 0 ? void 0 : _b.isSuspended)))
        throw new ApiError_1.default(403, "Vendor account is suspended or deleted. ");
    if (user.role === "CUSTOMER" && (((_c = user.customer) === null || _c === void 0 ? void 0 : _c.isDeleted) || ((_d = user.customer) === null || _d === void 0 ? void 0 : _d.isSuspended)))
        throw new ApiError_1.default(403, "Customer account is suspended or deleted. ");
    const isValidToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.reset_pass_secret);
    if (!isValidToken)
        throw new ApiError_1.default(403, "Forbidden");
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, 10);
    yield prisma_1.default.user.update({
        where: { id: payload.id },
        data: { password: hashedPassword }
    });
});
exports.AuthServices = {
    register,
    login,
    changePassword,
    resetPassword,
    forgotPassword
};
