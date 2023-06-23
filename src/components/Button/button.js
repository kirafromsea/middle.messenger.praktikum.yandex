import Handlebars from 'handlebars';
import {buttonTmpl} from './button.tmpl.js';

const Button = ({title, onClick, type}) => {
  return Handlebars.compile(buttonTmpl)({title, onClick, type});
}

export default Button;
