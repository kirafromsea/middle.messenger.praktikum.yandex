/*
import Router from './classes/Router.ts';
import LoginPage from './pages/login/login.ts';
import RegistrationPage from './pages/registration/registration.ts'; // TODO переименовать в signup
import ChatPage from './pages/chat/chat.ts';
import ErrorPage from './pages/error/error.ts';
import ProfilePage from './pages/profile/profile.ts';
import chatInfo from '../public/chats.js';

const chatPeople = chatInfo.chats.map(item => item.username);
const DEFAULT_ERROR = 404;

const routers = {
    index: '/',
    loginPage: '/login',
    signupPage: '/signup',
    profilePage: '/profile',
    chatPage: '/chat',
    errorPage: '/error',
}


document.addEventListener('DOMContentLoaded', () => {
    Router.use(routers.index, LoginPage);
    Router.use(routers.loginPage, LoginPage);
    Router.use(routers.signupPage, RegistrationPage);
    Router.use(routers.profilePage, ProfilePage);

    const pathname = window.location.pathname
    const legitPathNames = Object.values(routers).map((p) => p.toString())

    let isProtectedRoute = true

    switch (pathname) {
        case routers.index:
        case routers.loginPage:
        case routers.signupPage:
        case routers.profilePage:
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
 */
