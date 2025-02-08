import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const initDB = async () => {
  const db = await open({
    filename: './studio.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS packages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price INTEGER,
      features TEXT
    );
  `);

  return db;
};
