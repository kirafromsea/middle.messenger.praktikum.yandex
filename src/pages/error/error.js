import Handlebars from 'handlebars';
import {errorTmpl} from './error.tmpl.js';
import errors, {defaultErrorMessage} from './errorsList.js';
import Button from '../../components/Button/button.js';

const indexPageButton = Button({
  title: 'Go to index page',
  onClick: "window.location.href='/'",
  uiType: 'primary',
  type: 'button'
});

const ErrorPage = ({errorNumber}) => {
  const errorIndex = `error_${errorNumber}`;

  return Handlebars.compile(errorTmpl)({
    errorNumber: errorNumber,
    errorMessage: errors[errorIndex] || defaultErrorMessage,
    button: indexPageButton
  });
}

export default ErrorPage;
