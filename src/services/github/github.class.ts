import yaml from 'js-yaml';
import request from '../http/axios/http.instance';
class Github {
  // private _languagesYaml: Record<string, any> | undefined;
  // constructor() {
  //   this.initialize();
  // }

  // private async initialize() {
  //   const response = await request.get(
  //     'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml'
  //   );
  //   this._languagesYaml = yaml.load(response.data.toString()) as Record<string, any>;
  // }

  // public get languagesYaml(): Record<string, any>  | undefined {
  //   return this._languagesYaml;
  // }
}

export default Github;
