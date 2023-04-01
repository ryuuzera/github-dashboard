import { User } from '@/hooks/user';
import yaml from 'js-yaml';
import request from '../http/axios/http.instance';
import Github from './github.class';

export type LanguageMap = Record<string, string>;

class Languages extends Github {
  //#region private methods
  private async fetchLanguageColors(): Promise<LanguageMap> {
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
  private async getLanguageColorAsync(language: string): Promise<string | undefined> {
    const color = await this.fetchLanguageColors();
    return color[language.toLowerCase()];
  }
  //#endregion

  //#region public methods
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
    return sortedObj;
  }
  getLanguageColor(language: string, callback: (color: string | undefined) => void): void {
    this.getLanguageColorAsync(language.toLowerCase()).then((color) => {
        callback(color);
    });
  }
  //#endregion
}

export default Languages;
