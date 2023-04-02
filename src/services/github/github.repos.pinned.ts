// import request from '@/services/http/axios/http.instance';
import { graphql } from '@octokit/graphql';
import Github from './github.class';

export interface PinnedRepo {
  owner: string;
  repo: string;
  link: string;
  description?: string;
  image: string;
  website?: string;
  language?: string;
  languageColor?: string;
  stars: number;
  forks: number;
}

export class PinnedRepos extends Github {
  async getPinnedRepos(username: string): Promise<PinnedRepo[]> {
    const query = `
    query getPinnedRepos($login: String!) {
      user(login: $login) {
        pinnedItems(first: 6, types: [REPOSITORY]) {
          nodes {
            ... on Repository {
              name
              owner {
                login
              }
              description
              url
              homepageUrl
              stargazers {
                totalCount
              }
              forkCount
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
  `;

    const headers = {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    };

    const response = (await graphql(query, { login: username, headers })) as any;
    const pinnedRepos = response.user.pinnedItems.nodes;

    const result: PinnedRepo[] = pinnedRepos.map((repo: any) => {
      return {
        owner: repo.owner.login,
        repo: repo.name,
        link: repo.url,
        description: repo.description,
        image: `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`,
        website: repo.homepageUrl,
        language: repo.primaryLanguage?.name,
        languageColor: repo.primaryLanguage?.color,
        stars: repo.stargazers.totalCount,
        forks: repo.forkCount,
      };
    });

    return result;
  }
}
