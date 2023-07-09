import Block from '../../classes/Block.ts';
import registrationTmpl from './registration.tmpl.ts';
import Button, { ButtonProps } from '../../ui-components/Button/button.ts';
import Input from '../../ui-components/Input/input.ts';
import Form from '../../ui-components/Form/form.ts';
import {
    EMAIL_REGEXP,
    NAME_REGEXP,
    PASSWORD_REGEXP,
    PHONE_REGEXP,
    USERNAME_REGEXP,
} from '../../utils/validationRegexp.ts';

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
        events: {
            onClick: () => {
                window.location.href = '/chat';
            },
        },
    },
    {
        title: 'Log In',
        uiType: 'ghost',
        type: 'button',
        disabled: false,
        events: {
            onClick: (e) => {
                e.preventDefault();
                window.location.href = '/login';
            },
        },
    },
];

class RegistrationPage extends Block {
    constructor() {
        super('div', {});
    }

    init() {
        const controls = controlsData.map((item) => new Input({ ...item }));

        const buttons = buttonsData.map((item) => new Button({ ...item }));

        this.children.signupForm = new Form({
            title: 'Sign Up',
            controls,
            buttons,
            formClassName: 'auth-form',
        });
    }

    render() {
        console.log('=signup render', registrationTmpl, this.props);
        return this.compile({ template: registrationTmpl, context: { ...this.props } });
    }
}

export default RegistrationPage;
