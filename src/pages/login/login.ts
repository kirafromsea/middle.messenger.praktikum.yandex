import Block from '../../classes/Block.ts';
import Form from '../../components/Form/form.ts';
import Input from '../../components/Input/input.ts';
import loginTmpl from './login.tmpl.ts';

const controlsData = [
    {
        name: 'login',
        type: 'text',
        placeholder: 'Username',
        required: true,
        regexp: /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i,
        description: ``, //добавить аннотацию для допустимых символов
    },
    {
        name: 'password',
        type: 'password',
        placeholder: 'Password',
        required: true
    }
]

class LoginPage extends Block {
    constructor() {
        super({});
    }

    init() {
        const controls = controlsData.map(item => {
            return new Input({...item});
        })

        /* buttons */

        const form = new Form({
            title: 'Log In',
            controls,
            buttons: [],
            formClassName: 'auth-form'
        })

        this.children.loginForm = form;
    }

    render() {
        return this.compile({
            template: loginTmpl,
            props: this.props
        });
    }
}
export default LoginPage;
