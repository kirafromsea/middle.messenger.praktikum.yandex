import HTTPTransport from './HTTPTransport/HTTPTransport';
import {baseUrl} from '../config';
import {profileApi, headersJson} from './api-urls';
import {UpdatePasswordProps, UpdateProfileProps} from '../types/profile';

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
  updateUserInfo(data: UpdateProfileProps): Promise<any> {
    return this.http.put({
      url: profileApi.changeProfile,
      options: {
        data,
        ...headersJson,
      },
    });
  }

  /** Изменение пароля */

  changePassword(data: UpdatePasswordProps): Promise<any> {
    return this.http.put({
      url: profileApi.changePassword,
      options: {
        data,
        ...headersJson,
      },
    });
  }

  /** Изменение аватара */
  updateAvatar(data: FormData): Promise<any> {
    return this.http.put({
      url: profileApi.avatar,
      options: {
        data,
      },
    });
  }

  /** Поиск пользователей в системе */
  searchUser() {}
}

const ProfileAPI = new ProfileAPIClass();

export default ProfileAPI;
