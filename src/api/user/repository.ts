import type { Repository, Commit } from "@/api/user/model";
import { Database } from 'sqlite3';

const db = new Database('github.db');


export class userRepository {


  saveRepositoryMetadata(repoData: any) {
    db.run(`
        INSERT INTO repositories 
        (name, description, url, language, forks_count, stars_count, open_issues_count, watchers_count, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(name) DO UPDATE SET
        description = excluded.description,
        url = excluded.url,
        language = excluded.language,
        forks_count = excluded.forks_count,
        stars_count = excluded.stars_count,
        open_issues_count = excluded.open_issues_count,
        watchers_count = excluded.watchers_count,
        created_at = excluded.created_at,
        updated_at = excluded.updated_at;
    `, [
      repoData.name, repoData.description, repoData.url, repoData.language, repoData.forks_count,
      repoData.stars_count, repoData.open_issues_count, repoData.watchers_count,
      repoData.created_at, repoData.updated_at
    ]);
  }

  saveCommits(repoId: number, commits: any[]) {
    const stmt = db.prepare(`
        INSERT INTO commits (repository_id, commit_message, author, date, url)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(repository_id, commit_message, author, date, url) DO NOTHING;
    `);

    commits.forEach(commit => {
      stmt.run(repoId, commit.commit_message, commit.author, commit.date, commit.url);
    });

    stmt.finalize();
  }


}
