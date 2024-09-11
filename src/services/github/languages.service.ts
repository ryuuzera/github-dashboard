import { User } from '@/hooks/user';
import yaml from 'js-yaml';
import request from '../http/axios/http.instance';
import Github from './github.class';

export type LanguageMap = Record<string, string>;

class Languages extends Github {
  //#region public methods
  async getMostUsedLanguages(currentUser: User): Promise<any> {
    // Fetch all repositories for the current user
    const repos = await request.get(`${currentUser.repos_url}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    });

    const tempLanguages: any = {};

    const languagePromises = repos.data.map((repo: any) =>
      request.get(`https://api.github.com/repos/${currentUser.login}/${repo.name}/languages`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      })
    );

    const languageResponses = await Promise.all(languagePromises);

    languageResponses.forEach((res) => {
      for (const [lang, bytes] of Object.entries<number>(res.data)) {
        tempLanguages[lang] = (tempLanguages[lang] || 0) + bytes;
      }
    });

    const totalBytes: number = Object.values<number>(tempLanguages).reduce(
      (total: number, bytes: number) => total + bytes,
      0
    );

    const tempLanguagesPercentages: any = {};
    for (const [lang, bytes] of Object.entries<number>(tempLanguages)) {
      const percentage = (bytes / totalBytes) * 100;
      tempLanguagesPercentages[lang] = percentage;
    }

    const sortedObj = Object.fromEntries(
      Object.entries<number>(tempLanguagesPercentages).sort(([, a], [, b]) => b - a)
    );

    return sortedObj;
  }

  async getLanguageColors(): Promise<LanguageMap> {
    const response = await request.get(
      'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml'
    );
    const languages = yaml.load(response.data.toString()) as Record<string, any>;
    const languageColors: LanguageMap = {};

    for (const language in languages) {
      if (languages.hasOwnProperty(language)) {
        const color = languages[language].color;
        if (color) {
          const languageName = language.toLowerCase();
          languageColors[languageName] = `${color}`;
        }
      }
    }
    return languageColors;
  }

  async getLanguageFromExtension(extension: string): Promise<string | null> {
    const response = await request.get(
      'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml'
    );
    const languages = yaml.load(response.data.toString()) as Record<string, any>;
  
    // Iterate through languages to find the matching extension
    for (const language in languages) {
      if (languages.hasOwnProperty(language)) {
        const extensions = languages[language].extensions;
        if (extensions && extensions.includes(`.${extension}`)) {
          return language;
        }
      }
    }
  
    // Return null if no matching language is found
    return null;
  }
  //#endregion
}

export default Languages;
