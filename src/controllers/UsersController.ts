import UsersAPI from '../api-services/UsersAPI';
import Store from '../classes/Store';

class UsersController {
  public store: typeof Store = Store;

  public async searchUser(login: string) {
    try {
      const {status, response} = await UsersAPI.postSearch(login);
      if (status === 200) {
        return JSON.parse(response);
      } if (status >= 400) {
        this.store.set('error', {code: status, response});
      }
    } catch (e) {
      this.store.set('error', {code: 500});
    }

    return null;
  }
}

export default new UsersController();
