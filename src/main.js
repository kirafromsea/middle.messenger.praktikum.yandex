import LoginPage from './pages/login/login.ts';
import RegistrationPage from './pages/registration/registration.ts';
import ChatPage from './pages/chat/chat.ts';
import ErrorPage from './pages/error/error.ts';
import ProfilePage from './pages/profile/profile.ts';
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
        return new LoginPage();
      case 'signup':
        return new RegistrationPage();
      case 'chat':
        return new ChatPage();
      case 'profile':
        return new ProfilePage();
      case 'error':
      default:
        //const activeError = pathWay.length === 2 ? pathWay[1] : null;
        return new ErrorPage();
    }
  };

  const pageContent = page(pathPage);
  app.appendChild(pageContent.getContent());
});
