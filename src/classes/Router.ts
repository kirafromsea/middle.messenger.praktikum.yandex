import Block from './Block';
import Route from './Route';
import Store from './Store';
import {root} from '../config';

import {Paths} from '../utils/constants';

class Router {
  public routes: Route[];

  public history: History;

  public store: typeof Store = Store;

  private _currentRoute: Route | null;

  private _rootQuery: string;

  static __instance: Router;

  constructor(rootQuery: string = '') {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block): Router {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery});
    this.routes.push(route);
    return this;
  }

  start(): void {
    window.onpopstate = ((event: Event) => {
      const target = event?.currentTarget as Window;
      this._onRoute(target?.location.pathname);
    });

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string): void {
    this.store.set('error', null);
    let path = pathname;
    if (this.store.getState().auth) {
      if (pathname === Paths.Index || pathname === Paths.SignUp) {
        path = Paths.Chat;
        this.history.pushState({}, '', Paths.Chat);
      }
    } else if (pathname !== Paths.Index && pathname !== Paths.SignUp) {
      path = Paths.Index;
      this.history.pushState({}, '', Paths.Index);
    }

    console.log('=pathname', pathname);
    /**
     * Если изначальный адрес страницы был из существующих,
     * то выводим нужный путь в зависимости от того была авторизация или нет.
     * Если же изначлаьно указан ошибочный адрес, то открываем страницу с ошибкой.
     *
     * Если изначальный путь пустой, сохраняет в store ошибку с кодом 404
     */
    const checkPathname = this.getRoute(pathname);
    const route: Route | undefined = checkPathname ? this.getRoute(path) : this.getRoute(Paths.Error);

    if (!checkPathname) {
      this.store.set('error', {code: 404});
    }

    if (!route) {
      return;
    }
    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string): void {
    console.log('=router go', pathname);
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router(root);
