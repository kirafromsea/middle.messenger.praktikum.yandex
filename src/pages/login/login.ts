import Handlebars from 'handlebars';
import loginTmpl from './login.tmpl.ts';
import Button from '../../components/Button/button.ts';

const loginButton = Button({
    title: 'Log In',
    onClick: "window.location.href='/chat'",
    uiType: 'primary',
    type: 'submit',
});

const LoginPage = () => Handlebars.compile(loginTmpl)({ button: loginButton });

export default LoginPage;
