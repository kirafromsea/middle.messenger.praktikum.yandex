import HTTPTransport from './HTTPTransport';
import {baseUrl} from '../config';
import {profileApi, headersJson, headersFile} from './api-urls';

class ProfileAPIClass {
  public http = new HTTPTransport(`${baseUrl}/user`);

  /** Для получения профиля владельца чата */
  getProfile(id: number): Promise<any> {
    const url = profileApi.userInfo.replace(':id', `${id}`);
    return this.http.get({
      url,
      options: {...headersJson},
    });
  }

  /** Для изменения данных в профиле */
  updateUserInfo(data): Promise<any> {
    return this.http.put({
      url: profileApi.changeProfile,
      options: {
        data,
        ...headersJson,
      },
    });
  }

  /** Изменение пароля */

  changePassword(data): Promise<any> {
    return this.http.put({
      url: profileApi.changePassword,
      options: {
        data,
        ...headersJson,
      },
    });
  }

  /** Изменение аватара */
  updateAvatar(data) {
    return this.http.put({
      url: profileApi.avatar,
      options: {
        data
      }
    })
  }

  /** Поиск пользователей в системе */
  searchUser() {}
}

const ProfileAPI = new ProfileAPIClass();

export default ProfileAPI;
