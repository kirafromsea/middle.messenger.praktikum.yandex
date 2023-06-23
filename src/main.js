import LoginPage from './pages/login/login.js';
import RegistrationPage from './pages/registration/registration.js';
import ChatPage from './pages/chat/chat.js';
import ErrorPage from './pages/error/error.js';
import ProfilePage from './pages/profile/profile.js';
import chatInfo from '../public/chats.js';

const chatPeople = chatInfo.chats.map(item => item.username);
const DEFAULT_ERROR = 404;

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
        return LoginPage();
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
