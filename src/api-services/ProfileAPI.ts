import HTTPTransport from './HTTPTransport';
import {baseUrl} from '../config';
import {profileApi, headersJson} from './api-urls';
import {SignupDataType} from './types';

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
  changeUserInfo(data: SignupDataType): Promise<any> {
    return this.http.put({
      url: profileApi.changeProfile,
      options: {
        data,
        ...headersJson,
      },
    });
  }

  /** Изменение пароля */

  changePassword() {}

  /** Изменение аватара */
  changeAvatar() {}

  /** Поиск пользователей в системе */
  searchUser() {}
}

const ProfileAPI = new ProfileAPIClass();

export default ProfileAPI;