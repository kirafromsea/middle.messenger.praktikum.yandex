import ProfileAPI from '../api-services/ProfileAPI';
import {UpdatePasswordProps, UpdateProfileProps} from '../types/profile';
import Router from "../classes/Router";
import Store from "../classes/Store";
import {Paths} from "../utils/constants";
import {baseUrl} from "../config";

class ProfileController {
    public router: typeof Router = Router;
    public store: typeof Store = Store;

    /**
     * Получение данных профилей пользователей для чата.
     * @param userId
     */
    getUser(userId: number) {
        ProfileAPI.getProfile(userId)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    public async updateProfile(profile: UpdateProfileProps) {
        try {
            const { status, response } = await ProfileAPI.updateUserInfo(profile);
            if (status === 200) {
                this.store.set('user', JSON.parse(response));
            } else if (status >= 400) {
                this.store.set('error', {code: status, response});
            }
        } catch (e) {
            console.log(e);
            this.store.set('error', {code: 500});
        }
    };

    public async updatePassword(newPassword: UpdatePasswordProps) {
        try {
            this.store.set('isLoading', true);
            const { status, response } = await ProfileAPI.changePassword(newPassword);
            this.store.set('isLoading', false);
            if (status >= 400) {
                this.store.set('error', {code: status, response});
                return false;
            }
            return true;
        } catch (e) {
            console.log(e);
            this.store.set('error', {code: 500});
        }
    };

    public async updateAvatar(newAvatar) {
        try {
            this.store.set('isLoading', true);
            const { status, response } = await ProfileAPI.updateAvatar(newAvatar);
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
