import Router from './classes/Router/Router';
import {Paths} from './utils/constants';
import LoginPage from './pages/login/login';
import RegistrationPage from './pages/registration/registration';
import ChatPage from './pages/chat/chat';
import ErrorPage from './pages/error/error';
import ProfilePage from './pages/profile/profile';
import AuthController from './controllers/AuthController';
import Store from './classes/Store';

export default function initApp() {
  AuthController.getUser().then(() => {
    Router
      .use(Paths.Index, LoginPage)
      .use(Paths.SignUp, RegistrationPage)
      .use(Paths.Chat, ChatPage)
      .use(Paths.Settings, ProfilePage)
      .use(Paths.Error, ErrorPage)
      .start();
    Store.set('getPage', '');
  });
}
initApp();
