import HTTPTransport from './HTTPTransport/HTTPTransport';
import {baseUrl} from '../config';
import {headersJson, usersApi} from './api-urls';

class UsersAPIClass {
  public http = new HTTPTransport(`${baseUrl}/user`);

  postSearch(login: string): Promise<any> {
    return this.http.post({
      url: usersApi.search,
      options: {
        data: {
          login,
        },
        ...headersJson,
      },
    });
  }
}

const UsersAPI = new UsersAPIClass();

export default UsersAPI;
