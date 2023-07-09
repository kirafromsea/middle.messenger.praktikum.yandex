import LoginPage from './pages/login/login';
import RegistrationPage from './pages/registration/registration';
import ChatPage from './pages/chat/chat';
import ErrorPage from './pages/error/error';
import ProfilePage from './pages/profile/profile';

const DEFAULT_ERROR = 404;

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const pathPage = window.location.pathname;

  if (pathPage === '' || pathPage === '/') {
    window.location.href = '/login';
    return;
  }

  const page = (path) => {
    const pathWay = path.split('/').filter((item) => item !== '');
    const activeError = pathWay.length === 2 ? pathWay[1] : DEFAULT_ERROR;
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
        return new ErrorPage({errorCode: activeError});
    }
  };

  const pageContent = page(pathPage);
  app.appendChild(pageContent.getContent());
});
