import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const { Pool } = pg

const confingDatabase = {
    connectionString: process.env.DATABASE_URL,
};

export const db = new Pool(confingDatabase)