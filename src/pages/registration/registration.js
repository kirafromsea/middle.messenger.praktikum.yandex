import Handlebars from 'handlebars';
import {registrationTmpl} from './registration.tmpl.js';
import Button from '../../components/Button/button.js';

const registrationButton = Button({
  title: 'Sign Up',
  onClick: "window.location.href='/chat'",
  type: 'primary'
});

const RegistrationPage = () => {
  return Handlebars.compile(registrationTmpl)({button: registrationButton});
}

export default RegistrationPage;
