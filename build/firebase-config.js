"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const firestore_1 = require("firebase-admin/firestore");
const app_1 = require("firebase-admin/app");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const serviceAccount = require("../serviceAccountKey.json");
(0, app_1.initializeApp)({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
});
exports.db = (0, firestore_1.getFirestore)();
