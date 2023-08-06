import Router from '../classes/Router';
import Store from '../classes/Store';
import {Paths} from '../utils/constants';

import AuthAPI from '../api-services/AuthAPI';
import {LoginDataType, SignupDataType} from '../api-services/types';
import {baseUrl} from '../config';

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
        this.store.set('error', {code: status, response});
      }
    } catch (error) {
      console.log('=api login catch', error);
      this.store.set('error', {code: 500});
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
      this.store.set('error', {code: 500});
    }
  }

  public async getUser(): Promise<boolean> {
    try {
      this.store.set('error', null);
      const {status, response} = await AuthAPI.getUser();
      if (status === 200 && response) {
        const userInfo = JSON.parse(response);
        if (userInfo.avatar && userInfo.avatar.trim() !== '') {
          userInfo.avatar = `${baseUrl}/resources${userInfo.avatar}`;
        }
        this.store.set('user', userInfo);
        this.store.set('auth', true);
        return true;
      } if (status >= 400) {
        this.store.set('error', {code: status, response});
      }
      return false;
    } catch (error) {
      this.store.set('error', {code: 500});
      this.router.go(Paths.Error);
      return false;
    }
  }

  public async logout() {
    try {
      this.store.set('error', null);
      const {status, response} = await AuthAPI.logout();
      if (status === 200) {
        await this.store.setResetState();
        this.router.go(Paths.Index);
      } else {
        this.store.set('error', {code: status, response});
        this.router.go(Paths.Error);
      }
    } catch (e) {
      console.log(e);
      this.store.set('error', {code: 500});
      this.router.go(Paths.Error);
    }
  }
}

export default new AuthController();
