import Block from '../../classes/Block';
import registrationTmpl from './registration.tmpl';
import Button, {ButtonProps} from '../../ui-components/Button/button';
import Input from '../../ui-components/Input/input';
import Form from '../../ui-components/Form/form';
import AuthController from '../../controllers/AuthController';
import {
  EMAIL_REGEXP,
  NAME_REGEXP,
  PASSWORD_REGEXP,
  PHONE_REGEXP,
  USERNAME_REGEXP,
} from '../../utils/validationRegexp';
import {Paths} from '../../utils/constants';

const controlsData = [
  {
    name: 'first_name',
    type: 'text',
    value: '',
    placeholder: 'First name',
    required: true,
    regExpValidate: NAME_REGEXP,
    description: '', // добавить аннотацию для допустимых символов
  },
  {
    name: 'second_name',
    type: 'text',
    value: '',
    placeholder: 'Second name',
    required: true,
    regExpValidate: NAME_REGEXP,
    description: '',
  },
  {
    name: 'login',
    type: 'text',
    value: '',
    placeholder: 'Username',
    required: true,
    regExpValidate: USERNAME_REGEXP,
    description: '',
  },
  {
    name: 'email',
    type: 'text',
    value: '',
    placeholder: 'Email',
    required: true,
    regExpValidate: EMAIL_REGEXP,
    description: '',
  },
  {
    name: 'phone',
    type: 'text',
    placeholder: 'Phone',
    required: true,
    regExpValidate: PHONE_REGEXP,
    description: '',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'New password',
    required: true,
    regExpValidate: PASSWORD_REGEXP,
    description: '',
  },
];

const buttonsData: ButtonProps[] = [
  {
    title: 'Sign Up',
    uiType: 'primary',
    type: 'submit',
    disabled: false,
  },
  {
    title: 'Log In',
    uiType: 'ghost',
    type: 'button',
    disabled: false,
    events: {
      onClick: (e?: Event) => {
        e?.preventDefault();
        window.location.href = Paths.Index;
      },
    },
  },
];

class RegistrationPage extends Block {
  constructor() {
    super({});
  }

  init() {
    const controls = controlsData.map((item) => new Input({...item}));

    const buttons = buttonsData.map((item) => new Button({...item}));

    this.children.signupForm = new Form({
      title: 'Sign Up',
      controls,
      buttons,
      controller: AuthController.signup.bind(AuthController),
      formClassName: 'auth-form',
    });
  }

  render() {
    return this.compile({template: registrationTmpl, context: {...this.props}});
  }
}

export default RegistrationPage;
