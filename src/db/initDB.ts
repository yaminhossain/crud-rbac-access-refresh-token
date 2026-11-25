import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({ connectionString: config.connectionString });

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS roles(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(50) UNIQUE NOT NULL
      );

      CREATE TABLE IF NOT EXISTS topics(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(50) UNIQUE NOT NULL
      );

      CREATE TABLE IF NOT EXISTS users(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(50) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role_id UUID NOT NULL REFERENCES roles(id),
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS blogs(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        sub_title TEXT,
        content TEXT NOT NULL,
        topic_id UUID REFERENCES topics(id) ON DELETE SET NULL,
        author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      INSERT INTO roles(name) VALUES ('user'), ('admin')
      ON CONFLICT (name) DO NOTHING;
      
      INSERT INTO topics(name) VALUES ('Frontend'), ('Backend'), ('Database'), ('Security'), ('DevOps')
      ON CONFLICT (name) DO NOTHING;
    `);
    console.log("Database ready");
  } catch (error) {
    console.error("Database init failed:", error);
    throw error;
  }
};

export default initDB;