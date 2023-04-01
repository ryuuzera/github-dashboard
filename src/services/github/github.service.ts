import { User } from "@/hooks/user";
import request from '../http/axios/http.instance'

class Github {
  async getMostUsedLanguages(currentUser: User): Promise<any> {
    const repos = await request.get(`${currentUser.repos_url}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    });

    const tempLanguages: any = {};

    for (const repo of repos.data) {
      const res = await request.get(`https://api.github.com/repos/${currentUser.login}/${repo.name}/languages`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      });

      for (const [lang, bytes] of Object.entries(res.data)) {
        tempLanguages[lang] = (tempLanguages[lang] || 0) + bytes;
      }
    }

    const totalBytes: any = Object.values(tempLanguages).reduce((total: any, bytes: any) => total + bytes, 0);

    const tempLanguagesPercentages: any = {};
    for (const [lang, bytes] of Object.entries(tempLanguages)) {
      const percentage = ((bytes as any) / totalBytes) * 100;
      tempLanguagesPercentages[lang] = percentage;
    }

    const sortedObj = Object.fromEntries(
      Object.entries(tempLanguagesPercentages).sort(([, a]: any, [, b]): any => (b as any) - a)
    );
    return sortedObj
  }
}

export default Github;
