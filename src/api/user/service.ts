import { StatusCodes } from "http-status-codes";
import { userRepository } from "@/api/user/repository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import axios from 'axios';


export class UserService {

  private userRepository: userRepository;

  constructor(repository: userRepository = new userRepository()) {
    this.userRepository = repository;
  }
  async fetchRepositoryMetadata(repoName: string) {
    const url = `https://api.github.com/repos/${repoName}`;
    const response = await axios.get(url);
    const repoData = response.data;

    return {
      id: repoData.id,
      name: repoData.name,
      description: repoData.description,
      url: repoData.html_url,
      language: repoData.language,
      forks_count: repoData.forks_count,
      stars_count: repoData.stargazers_count,
      open_issues_count: repoData.open_issues_count,
      watchers_count: repoData.watchers,
      created_at: repoData.created_at,
      updated_at: repoData.updated_at,
    };
  }



  async fetchCommits(repoName: string, sinceDate: string) {
    const url = `https://api.github.com/repos/${repoName}/commits?since=${sinceDate}`;
    const response = await axios.get(url);
    const commits = response.data;

    return commits.map((commit: any) => ({
      commit_message: commit.commit.message,
      author: commit.commit.author.name,
      date: commit.commit.author.date,
      url: commit.html_url,
    }));
  }

  startMonitoring(repoName: string, interval: number, sinceDate: string) {
    setInterval(async () => {
      const repoData = await this.fetchRepositoryMetadata(repoName);
      this.userRepository.saveRepositoryMetadata(repoData);

      const commits = await this.fetchCommits(repoName, sinceDate);
      this.userRepository.saveCommits(repoData.id, commits);
    }, interval);
  }


  async fetchTopAuthors() {

    const url = 'https://api.github.com/search/repositories?q=created:%3E2022-01-01&sort=stars&order=desc';
    const response = await axios.get(url);
    const repos = response.data.items;
    return repos;
  }


}

export const userService = new UserService();
