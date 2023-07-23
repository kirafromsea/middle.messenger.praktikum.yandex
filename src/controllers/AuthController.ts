import Router from '../classes/Router';
import Store from '../classes/Store';
import {Paths} from '../utils/constants';

import AuthAPI from '../api-services/AuthAPI';
import {LoginDataType, SignupDataType} from '../api-services/types';

class AuthController {
  public router: typeof Router = Router;

  public store: typeof Store = Store;

  public async login(data: LoginDataType) {
    console.log('=this.store', this.store);
    try {
      this.store.set('isLoading', true);

      const {status, response} = await AuthAPI.login(data);
      const reason = response && response !== 'OK' ? JSON.parse(response).reason : null;
      console.log('=signup login', response);

      if (status === 200 || (status === 400 && reason === 'User already in system')) { // TODO вынести текст ошибки в константы
        this.store.set('auth', true);
        await this.getUser();
        this.router.go(Paths.Chat);
        this.store.set('isLoading', false);
      } else {
        this.router.go(`${Paths.Error}/${status}`);
      }
    } catch (error) {
      console.log('=api login catch', error);
    }
  }

  public async signup(data: SignupDataType): Promise<void> {
    try {
      this.store.set('isLoading', true);
      const {status, response} = await AuthAPI.signup(data);
      console.log('=signup response', JSON.parse(response).reason);
      if (status === 200) {
        await this.getUser();
        this.router.go(Paths.Chat);
      } else {
        this.store.set('signupError', status);
      }

      this.store.set('isLoading', false);
    } catch (error) {
      console.log('=error', error);
    }
  }

  public async getUser(): Promise<boolean> {
    try {
      const {status, response} = await AuthAPI.getUser();
      if (status === 200 && response) {
        this.store.set('user', JSON.parse(response));
        this.store.set('auth', true);
        return true;
      }
      return false;
    } catch (error) {
      console.log('=getUser error catch', error);
      return false;
    }
  }

  public async logout() {
    try {
      const {status} = await AuthAPI.logout();
      console.log('=logout', status);
      if (status === 200) {
        this.store.setResetState();
        this.router.go(Paths.Index);
      } else {
        this.router.go(`${Paths.Error}/${status}`);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AuthController();
