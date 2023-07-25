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
    const getPathname = this.getRoute(pathname);
    let route: Route | undefined;
   // TODO добавить случай, когда напрямую зашли на страницу ошибки
    if (this.store.getStateItem('auth')) {
      if (pathname === Paths.Index || pathname === Paths.SignUp) {
        route = this.getRoute(Paths.Chat);
        this.history.pushState({}, '', Paths.Chat);
      }
    } else if (getPathname && pathname !== Paths.Index && pathname !== Paths.SignUp) {
      route = this.getRoute(Paths.Index);
      this.history.pushState({}, '', Paths.Index);
    } else {
      route = getPathname ?? this.getRoute(Paths.Error);
      this.history.pushState({}, '', Paths.Error);
    }

    if (!getPathname) {
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
