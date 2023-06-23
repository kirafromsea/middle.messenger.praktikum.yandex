import Handlebars from 'handlebars';
import {loginTmpl} from './login.tmpl.js';
import Button from '../../components/Button/button.js';

const loginButton = Button({
  title: 'Log In',
  onClick: "window.location.href='/chat'",
  type: 'primary'
});

const LoginPage = () => {
  return Handlebars.compile(loginTmpl)({button: loginButton});
}

export default LoginPage;
