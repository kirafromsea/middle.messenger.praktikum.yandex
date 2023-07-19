import Router from './classes/Router';
import Paths from './utils/router.js';
import LoginPage from './pages/login/login';
import RegistrationPage from './pages/registration/registration';
import ChatPage from './pages/chat/chat';
import ErrorPage from './pages/error/error';
import ProfilePage from './pages/profile/profile';


const DEFAULT_ERROR = 404;

document.addEventListener('DOMContentLoaded', () => {
  Router
   .use(Paths.Index, LoginPage, {})
   .start();
});

/*
Router
        .use("/", Authorization, {})
        .use("/registration", Registration, {})
        .use("/chat", Chat, {})
        .use("/profile", Profile, {})
        .use("/profile-edit-avatar", ProfileEditAvatar, {})
        .use("/profile-edit-data", ProfileEditData, {})
        .use("/profile-edit-password", ProfileEditPassword, {})
        .use("/error500", Error500, {})
        .use("/error404", Error404, {})
        .start();
 */
