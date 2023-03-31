

class Assets {
  private readonly _background: string;
  constructor(){
    this._background = '/assets/images/background.gif';
  }
  get background() {
    return this._background;
  }
}

export default new Assets();