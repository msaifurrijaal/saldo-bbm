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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var bcrypt = require("bcrypt");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var hashedPassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt.hash("password", 10)];
                case 1:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, prisma.user.createMany({
                            data: [
                                {
                                    name: "John Doe",
                                    email: "john@example.com",
                                    password: hashedPassword,
                                    role: "admin",
                                },
                                {
                                    name: "Jane Doe",
                                    email: "jane@example.com",
                                    password: hashedPassword,
                                    role: "user",
                                },
                                {
                                    name: "Rahman Solihin",
                                    email: "rahman@example.com",
                                    password: hashedPassword,
                                    role: "user",
                                },
                                {
                                    name: "Roni Hermanto",
                                    email: "roni@example.com",
                                    password: hashedPassword,
                                    role: "user",
                                },
                                {
                                    name: "Angga Tejo",
                                    email: "angga@example.com",
                                    password: hashedPassword,
                                    role: "user",
                                },
                                {
                                    name: "Admin",
                                    email: "admin@example.com",
                                    password: hashedPassword,
                                    role: "admin",
                                },
                            ],
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma.car.createMany({
                            data: [
                                {
                                    licensePlate: "AB 1234 CD",
                                    brand: "Toyota",
                                    type: "MB Barang",
                                    initialBalance: 10,
                                    currentBalance: 10,
                                    fuelUsage: 0,
                                    fuelConsumption: 15,
                                    userId: 2,
                                },
                                {
                                    licensePlate: "AG 7281 KO",
                                    brand: "Daihatsu",
                                    type: "MB Barang",
                                    initialBalance: 14,
                                    currentBalance: 14,
                                    fuelUsage: 0,
                                    fuelConsumption: 15,
                                    userId: 2,
                                },
                                {
                                    licensePlate: "CD 5678 EF",
                                    brand: "Honda",
                                    type: "MB Barang",
                                    initialBalance: 15,
                                    currentBalance: 15,
                                    fuelUsage: 0,
                                    fuelConsumption: 15,
                                    userId: 3,
                                },
                                {
                                    licensePlate: "N 9182 RK",
                                    brand: "Suzuki",
                                    type: "MB Barang",
                                    initialBalance: 15,
                                    currentBalance: 15,
                                    fuelUsage: 0,
                                    fuelConsumption: 17,
                                    userId: 3,
                                },
                                {
                                    licensePlate: "N 8291 OR",
                                    brand: "Nissan",
                                    type: "MB Transport",
                                    initialBalance: 15,
                                    currentBalance: 15,
                                    fuelUsage: 0,
                                    fuelConsumption: 10,
                                    userId: 4,
                                },
                                {
                                    licensePlate: "N 9862 GA",
                                    brand: "Suzuki",
                                    type: "MB Barang",
                                    initialBalance: 20,
                                    currentBalance: 20,
                                    fuelUsage: 0,
                                    fuelConsumption: 18,
                                    userId: 5,
                                },
                            ],
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, prisma.activity.createMany({
                            data: [
                                {
                                    userId: 2,
                                    carId: 1,
                                    startLocation: "Malang",
                                    endLocation: "Blitar",
                                    distance: 60,
                                    status: "approve",
                                    date: "2024-04-18",
                                },
                                {
                                    userId: 3,
                                    carId: 2,
                                    startLocation: "Malang",
                                    endLocation: "Pasuruan",
                                    distance: 50,
                                    status: "pending",
                                    date: "2024-04-18",
                                },
                                {
                                    userId: 3,
                                    carId: 2,
                                    startLocation: "Pasuruan",
                                    endLocation: "Kediri",
                                    distance: 70,
                                    status: "pending",
                                    date: "2024-04-19",
                                },
                                {
                                    userId: 4,
                                    carId: 3,
                                    startLocation: "Kediri",
                                    endLocation: "Malang",
                                    distance: 60,
                                    status: "pending",
                                    date: "2024-04-20",
                                },
                                {
                                    userId: 5,
                                    carId: 4,
                                    startLocation: "Sidoarjo",
                                    endLocation: "Surabaya",
                                    distance: 40,
                                    status: "pending",
                                    date: "2024-04-21",
                                },
                            ],
                        })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, prisma.request.createMany({
                            data: [
                                {
                                    userId: 2,
                                    carId: 1,
                                    fuelAmount: 10,
                                    date: "2024-04-18",
                                    status: "pending",
                                },
                                {
                                    userId: 3,
                                    carId: 2,
                                    fuelAmount: 15,
                                    date: "2024-04-19",
                                    status: "pending",
                                },
                                {
                                    userId: 4,
                                    carId: 3,
                                    fuelAmount: 8,
                                    date: "2024-04-20",
                                    status: "pending",
                                },
                                {
                                    userId: 5,
                                    carId: 4,
                                    fuelAmount: 12,
                                    date: "2024-04-21",
                                    status: "pending",
                                },
                            ],
                        })];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) { return console.error(e); })
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
