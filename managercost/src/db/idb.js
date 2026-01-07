// src/db/idb.js
import { openDB } from "idb";

const DB_NAME = "cost-manager-db";
const DB_VERSION = 1;
const STORE = "costs";

async function getDb() {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE)) {
                const store = db.createObjectStore(STORE, {
                    keyPath: "id",
                    autoIncrement: true,
                });

                store.createIndex("byDate", "date");      // YYYY-MM-DD
                store.createIndex("byCategory", "category");
            }
        },
    });
}

export async function addCost(cost) {
    const db = await getDb();

    const costToSave = {
        ...cost,                 // date, currency, category, description...
        sum: Number(cost.sum),   // רק תיקון סוג
    };

    const id = await db.add(STORE, costToSave);
    return { ...costToSave, id };
}

export async function getAllCosts() {
    const db = await getDb();
    return db.getAll(STORE);
}

export async function getCostsByMonthYear(year, month) {
    const db = await getDb();
    const mm = String(month).padStart(2, "0");

    const from = `${year}-${mm}-01`;
    const to = `${year}-${mm}-31`;

    return db.getAllFromIndex(STORE, "byDate", IDBKeyRange.bound(from, to));
}

export async function deleteCost(id) {
    const db = await getDb();
    return db.delete(STORE, id);
}

export async function clearAllCosts() {
    const db = await getDb();
    return db.clear(STORE);
}
