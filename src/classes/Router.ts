import Block from './Block';
import Route from './Route';
import Store from './Store';
import {root} from '../config';

import {Paths} from '../utils/router';

class Router {
    public routes: Route[];
    public history: History;
    public _currentRoute: Route | null;
    _rootQuery: string;

    // eslint-disable-next-line no-use-before-define
    static __instance: Router;

    constructor(rootQuery: string = '') {
        if (Router.__instance) {
            // eslint-disable-next-line no-constructor-return
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: typeof Block): Router {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
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
        if (Store.getState().auth) {
            if (pathname === Paths.Index || pathname === Paths.SignUp) {
                pathname = Paths.Chat;
                this.history.pushState({}, '', Paths.Chat);
            }
        } else if (pathname !== Paths.Index && pathname !== Paths.SignUp) {
            pathname = Paths.Index;
            this.history.pushState({}, '', Paths.Index);
        }

        const route: Route | undefined = this.getRoute(pathname) ?? this.getRoute(Paths.Error);
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