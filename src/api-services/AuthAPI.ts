import HTTPTransport from './HTTPTransport';
import {baseUrl} from '../config';
import {authApi} from './api-urls';

export type SignupDataType = {
    email: string,
    login: string,
    first_name: string,
    second_name: string,
    phone: string,
    password: string,
};

export type LoginDataType = {
    login: string,
    password: string,
};

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

export const AuthAPI = new AuthAPIClass();
