import HTTPTransport from './HTTPTransport/HTTPTransport';
import {baseUrl} from '../config';
import {authApi} from './api-urls';
import {SignupDataType, LoginDataType} from './types';

class AuthAPIClass {
  public http = new HTTPTransport(`${baseUrl}/auth`);

  signup(data: SignupDataType): Promise<any> {
    return this.http.post({
      url: authApi.signup,
      options: {
        data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    });
  }

  login(data: LoginDataType): Promise<any> {
    return this.http.post({
      url: authApi.login,
      options: {
        data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    });
  }

  logout(): Promise<any> {
    return this.http.post({
      url: authApi.logout,
      options: {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    });
  }

  getUser(): Promise<any> {
    return this.http.get({url: authApi.userInfo});
  }
}

const AuthAPI = new AuthAPIClass();

export default AuthAPI;
