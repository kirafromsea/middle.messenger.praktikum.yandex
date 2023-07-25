import ProfileAPI from '../api-services/ProfileAPI';

class ProfileController {
    getProfile(userId: number) {
        ProfileAPI.getProfile(userId)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export default new ProfileController();
