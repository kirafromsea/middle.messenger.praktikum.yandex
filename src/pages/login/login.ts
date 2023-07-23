import Block from '../../classes/Block';
import AuthController from '../../controllers/AuthController';
import Form from '../../ui-components/Form/form';
import Input from '../../ui-components/Input/input';
import {USERNAME_REGEXP} from '../../utils/validationRegexp';
import {Paths} from '../../utils/constants';
import Button, {ButtonProps} from '../../ui-components/Button/button';
import loginTmpl from './login.tmpl';

const controlsData = [
  {
    name: 'login',
    type: 'text',
    value: '',
    placeholder: 'Username',
    required: true,
    regExpValidate: USERNAME_REGEXP,
    description: '', // добавить аннотацию для допустимых символов
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    required: true,
  },
];

const buttonsData: ButtonProps[] = [
  {
    title: 'Log In',
    uiType: 'primary',
    type: 'submit',
    disabled: false,
    events: {
      onClick: () => {
        // window.location.href = Paths.Chat;
      },
    },
  },
  {
    title: 'Sign Up',
    uiType: 'ghost',
    type: 'button',
    disabled: false,
    events: {
      onClick: (e?: Event) => {
        if (!e) {
          return;
        }
        e.preventDefault();
        window.location.href = Paths.SignUp;
      },
    },
  },
];

class LoginPage extends Block {
  constructor() {
    super('div', {});
  }

  init() {
    const controls = controlsData.map((item) => new Input({...item}));

    const buttons = buttonsData.map((item) => new Button({...item}));

    this.children.loginForm = new Form({
      title: 'Log In',
      controls,
      buttons,
      controller: AuthController.login.bind(AuthController),
      formClassName: 'auth-form',
    });
  }

  render() {
    return this.compile({template: loginTmpl, context: {...this.props}});
  }
}
export default LoginPage;
