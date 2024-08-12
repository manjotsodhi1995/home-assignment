// src/db.ts
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./data.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS repositories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      url TEXT,
      language TEXT,
      forks_count INTEGER,
      stars_count INTEGER,
      open_issues_count INTEGER,
      watchers_count INTEGER,
      created_at TEXT,
      updated_at TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS commits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      repository_id INTEGER,
      message TEXT,
      author TEXT,
      date TEXT,
      url TEXT,
      FOREIGN KEY(repository_id) REFERENCES repositories(id)
    )`);
  }
});
