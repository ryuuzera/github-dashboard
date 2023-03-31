

class Assets {
  private readonly _background: string;
  private readonly _loading: string;
  constructor(){
    this._background = '/assets/images/background.gif';
    this._loading    = '/assets/images/cat-loading.png'
  }
  get background() {
    return this._background;
  }
  get loading() {
    return this._loading;
  }
}

export default new Assets();