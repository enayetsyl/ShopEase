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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdminAccount = seedAdminAccount;
const config_1 = __importDefault(require("../config"));
const prisma_1 = __importDefault(require("../shared/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function seedAdminAccount() {
    return __awaiter(this, void 0, void 0, function* () {
        const adminEmail = config_1.default.ADMIN_EMAIL;
        const adminPassword = config_1.default.ADMIN_PASSWORD;
        // Check if the admin account already exists
        const existingAdmin = yield prisma_1.default.user.findUnique({
            where: { email: adminEmail },
        });
        if (!existingAdmin) {
            console.log("Admin account does not exist. Creating one...");
            // Hash the admin password
            const hashedPassword = yield bcrypt_1.default.hash(adminPassword, 10);
            // Create admin account
            yield prisma_1.default.user.create({
                data: {
                    email: adminEmail,
                    password: hashedPassword,
                    role: "ADMIN",
                    name: "Super Admin",
                },
            });
            console.log(`Admin account created with email: ${adminEmail}`);
        }
        else {
            console.log("Admin account already exists. Skipping creation.");
        }
    });
}
