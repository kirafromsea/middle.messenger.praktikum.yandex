import Router from './classes/Router.ts';
import LoginPage from './pages/login/login.ts';
import RegistrationPage from './pages/registration/registration.ts';
import ChatPage from './pages/chat/chat.ts';
import ErrorPage from './pages/error/error.ts';
import ProfilePage from './pages/profile/profile.ts';
import chatInfo from '../public/chats.js';

const chatPeople = chatInfo.chats.map(item => item.username);
const DEFAULT_ERROR = 404;

const routers = {
  index: '/',
  loginPage: '/login',
  registrationPage: '/registration',
  profilePage: '/profile',
  chat: '/chat',
  error: '/error',
}


document.addEventListener('DOMContentLoaded', () => {
  Router.use(routers.index, LoginPage);
  Router.use(routers.loginPage, LoginPage);

  const pathname = window.location.pathname
  const legitPathNames = Object.values(routers).map((p) => p.toString())

  let isProtectedRoute = true

  switch (pathname) {
    case routers.index:
    case routers.loginPage:
    //case routers.Register:
      isProtectedRoute = false
      break
  }

  if (!legitPathNames.includes(pathname)) Router.go(routers.error)
  try {
    Router.start()
  } catch (e) {
    if (isProtectedRoute) {
      Router.go(routers.index)
    }
  }
});

/*
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const pathPage = window.location.pathname;

  if (pathPage === '' || pathPage === '/') {
    window.location.href = "/login";
    return;
  }

  const page = (path) => {
    const pathWay = path.split('/').filter(item => item !== '');
    switch (pathWay[0]) {
      case 'login':
        return new LoginPage;
      case 'signup':
        return RegistrationPage();
      case 'chat':
        const activeChatName = pathWay.length === 2 ? pathWay[1] : null;
        if (pathWay.length > 2 || (activeChatName && chatPeople && !chatPeople.includes(activeChatName))) {
          return ErrorPage({errorNumber: 404});
        }
        return ChatPage({
          profile: chatInfo.profile,
          chats: chatInfo.chats,
          activeChat: activeChatName
        });
      case 'profile':
        if (!chatInfo.profile || !chatInfo.profile.login) {
          return ErrorPage({errorNumber: 401});
        }
        return ProfilePage({...chatInfo.profile});
      case 'error':
      default:
        const activeError = pathWay.length === 2 ? pathWay[1] : null;
        return ErrorPage({errorNumber: activeError || DEFAULT_ERROR});
    }
  };

  app.innerHTML = page(pathPage);
});
 */
