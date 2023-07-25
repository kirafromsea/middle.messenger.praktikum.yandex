import Router from '../classes/Router';
import Store from '../classes/Store';
import {Paths} from '../utils/constants';

import AuthAPI from '../api-services/AuthAPI';
import {LoginDataType, SignupDataType} from '../api-services/types';

class AuthController {
  public router: typeof Router = Router;

  public store: typeof Store = Store;

  public async login(data: LoginDataType) {
    try {
      this.store.set('isLoading', true);
      this.store.set('error', null);

      const {status, response} = await AuthAPI.login(data);
      const reason = response && response !== 'OK' ? JSON.parse(response).reason : null;

      if (status === 200 || (status === 400 && reason === 'User already in system')) { // TODO вынести текст ошибки в константы
        this.store.set('auth', true);
        await this.getUser();
        this.router.go(Paths.Chat);
        this.store.set('isLoading', false);
      } else {
        console.log('=login error', status, response);
        this.store.set('error', {code: status, response});
        //this.router.go(`${Paths.Error}/${status}`);
      }
    } catch (error) {
      console.log('=api login catch', error);
    }
  }

  public async signup(data: SignupDataType): Promise<void> {
    try {
      this.store.set('isLoading', true);
      this.store.set('error', null);
      const {status, response} = await AuthAPI.signup(data);
      if (status === 200) {
        await this.getUser();
        this.router.go(Paths.Chat);
      } else {
        this.store.set('error', {code: status, response});
      }

      this.store.set('isLoading', false);
    } catch (error) {
      console.log('=error', error);
      // TODO сделать сохранение ошибок в store
    }
  }

  public async getUser(): Promise<boolean> {
    try {
      this.store.set('error', null);
      const {status, response} = await AuthAPI.getUser();
      if (status === 200 && response) {
        this.store.set('user', JSON.parse(response));
        this.store.set('auth', true);
        return true;
      } if (status >= 400) {
        this.store.set('error', {code: status, response});
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  public async logout() {
    try {
      this.store.set('error', null);
      const {status, response} = await AuthAPI.logout();
      if (status === 200) {
        this.store.setResetState();
        console.log('=logout store', this.store);
        this.router.go(Paths.Index);
      } else {
        this.store.set('error', {code: status, response});
        this.router.go(`${Paths.Error}/${status}`);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AuthController();
