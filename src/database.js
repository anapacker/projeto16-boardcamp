import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const { Pool } = pg

const confingDatabase = {
    connectionString: process.env.DATABASE_URL,
};

if (process.env.MODE === "production") configDatabase.ssl = true;

export const db = new Pool(confingDatabase)