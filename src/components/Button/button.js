import Handlebars from 'handlebars';
import {buttonTmpl} from './button.tmpl.js';

const Button = ({title, onClick, uiType, type = 'button'}) => {
  return Handlebars.compile(buttonTmpl)({title, onClick, uiType, type});
}

export default Button;
