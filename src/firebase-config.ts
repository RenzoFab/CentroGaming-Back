import { getFirestore } from "firebase-admin/firestore";
import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";

const serviceAccount = require("../serviceAccountKey.json");

initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = getFirestore();
