import { User } from "@/hooks/user";
import Github from "./github.class";
import request from '@/services/http/axios/http.instance'

class GithubUsers extends Github {
  async getUserbyName(name: string): Promise<User> {
    const user = await request.get(`https://api.github.com/users/${name}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      });
    return user.data;
  }

  async getUserCommitsByLogin(login: string): Promise<any> {
    const commits = await request.get(
      `https://api.github.com/search/commits?q=author:${login}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      }
    );
    return commits.data;
  }

  async getUserFollowers(user: User): Promise<any> {
    const followersResponse = await request.get(user.followers_url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    });
    return followersResponse.data;
  }
}

export default GithubUsers