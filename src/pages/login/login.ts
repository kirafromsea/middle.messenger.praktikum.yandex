import Block from '../../classes/Block.ts';
import Form from '../../components/Form/form.ts';
import Input from '../../components/Input/input.ts';
import Button from '../../components/Button/button.ts';
import loginTmpl from './login.tmpl.ts';

const controlsData = [
    {
        name: 'login',
        type: 'text',
        value: '',
        placeholder: 'Username',
        required: true,
        regExpValidate: /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i,
        description: '', // добавить аннотацию для допустимых символов
    },
    {
        name: 'password',
        type: 'password',
        placeholder: 'Password',
        required: true,
    },
];

const buttonsData = [
    {
        title: 'Login',
        uiType: 'primary',
        type: 'submit',
        events: {
            onClick: (e) => {
                console.log('=onclick submit e', e);
            },
        },
    },
    {
        title: 'Sign Up',
        uiType: 'ghost',
        type: 'button',
        events: {
            onClick: (e) => {
                e.preventDefault();
                window.location.href = '/signup';
            },
        },
    },
];

class LoginPage extends Block {
    constructor() {
        super('div', {});
    }

    init() {
        const controls = controlsData.map((item) => new Input({ ...item }));

        const buttons = buttonsData.map((item) => new Button({ ...item }));

        this.children.loginForm = new Form({
            title: 'Log In',
            controls,
            buttons,
            formClassName: 'auth-form',
        });
    }

    render() {
        return this.compile({ template: loginTmpl, context: { ...this.props } });
    }
}
export default LoginPage;