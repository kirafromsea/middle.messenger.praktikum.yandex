import Handlebars from 'handlebars';
import registrationTmpl from './registration.tmpl.ts';
// import Button from '../../components/Button/button.ts';
/*
const registrationButton = Button({
    title: 'Sign Up',
    onClick: "window.location.href='/chat'",
    uiType: 'primary',
    type: 'submit',
});
*/
const RegistrationPage = () => Handlebars.compile(registrationTmpl)({ /* button: registrationButton */ });

export default RegistrationPage;
