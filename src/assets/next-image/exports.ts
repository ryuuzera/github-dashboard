class Assets {
  private readonly _background: string;
  private readonly _loading: string;
  private readonly _cat_cry: string;
  constructor() {
    this._background = '/assets/images/background.gif';
    this._loading = '/assets/images/cat-loading.png';
    this._cat_cry = '/assets/images/cat-crying.gif';
  }
  get background() {
    return this._background;
  }
  get loading() {
    return this._loading;
  }
  get catCry() {
    return this._cat_cry;
  }
}

export default new Assets();
