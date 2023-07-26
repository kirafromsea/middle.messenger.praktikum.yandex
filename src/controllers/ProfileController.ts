import ProfileAPI from '../api-services/ProfileAPI';
import {UpdatePasswordProps, UpdateProfileProps} from '../types/profile';
import Router from "../classes/Router";
import Store from "../classes/Store";

class ProfileController {
    public router: typeof Router = Router;
    public store: typeof Store = Store;

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
        }
    };

    public async updatePassword(password: UpdatePasswordProps) {
        try {
            this.store.set('isLoading', true);
            const { status, response } = await ProfileAPI.changePassword(password);
            this.store.set('isLoading', false);
            if (status >= 400) {
                this.store.set('error', {code: status, response});
                return false;
            }
            return true;
        } catch (e) {
            console.log(e);
        }
    };
}

export default new ProfileController();
