import ProfileAPI from '../api-services/ProfileAPI';
import {UpdatePasswordProps, UpdateProfileProps} from '../types/profile';
import Store from '../classes/Store';
import {baseUrl} from '../config';

class ProfileController {
  public store: typeof Store = Store;

  public async updateProfile(profile: UpdateProfileProps) {
    try {
      const {status, response} = await ProfileAPI.updateUserInfo(profile);
      if (status === 200) {
        this.store.set('user', JSON.parse(response));
      } else if (status >= 400) {
        this.store.set('error', {code: status, response});
      }
    } catch (e) {
      console.log(e);
      this.store.set('error', {code: 500});
    }
  }

  public async updatePassword(newPassword: UpdatePasswordProps) {
    try {
      this.store.set('isLoading', true);
      const {status, response} = await ProfileAPI.changePassword(newPassword);
      this.store.set('isLoading', false);
      if (status >= 400) {
        this.store.set('error', {code: status, response});
        return false;
      }
      return true;
    } catch (e) {
      console.log(e);
      this.store.set('error', {code: 500});
      return false;
    }
  }

  public async updateAvatar(newAvatar: FormData) {
    try {
      this.store.set('isLoading', true);
      const {status, response} = await ProfileAPI.updateAvatar(newAvatar);
      this.store.set('isLoading', false);
      if (status >= 400) {
        this.store.set('error', {code: status, response});
        return false;
      }
      const newUserInfo = JSON.parse(response);
      if (newUserInfo.avatar) {
        newUserInfo.avatar = `${baseUrl}/resources${newUserInfo.avatar}`;
      }
      this.store.set('profile', newUserInfo);
      return newUserInfo;
    } catch (e) {
      console.log(e);
      this.store.set('error', {code: 500});
      return false;
    }
  }
}

export default new ProfileController();
