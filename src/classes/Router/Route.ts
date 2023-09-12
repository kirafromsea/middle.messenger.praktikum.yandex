import Block from '../Block/Block';
import Store from '../Store';

export function render(query: string, block: Block): void {
  const root = document.querySelector(query);
  if (root) {
    root.innerHTML = '';
    root.append(block.getContent() || '');
  }
}

export interface IRoute {
  navigate(pathname: string): void;
  leave(): void;
  match(pathname: string): void;
  render(): void;
}

class Route {
  private _pathname: string;

  private _blockClass: typeof Block | null;

  private _block: Block | null;

  private _props: Record<string, string>;

  constructor(pathname: string, view: typeof Block, props: Record<string, string>) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  render() {
    if (!this._blockClass) {
      return;
    }
    this._block = new this._blockClass({});
    render(this._props.rootQuery, this._block);
    const root = document.querySelector(this._props.rootQuery);
    if (root && this._block !== null) {
      root.innerHTML = '';
      root.append(this._block.getContent() || '');
    }
    Store.set('', '');
  }

  getPathname() {
    return this._pathname;
  }
}

export default Route;
