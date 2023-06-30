import Handlebars from 'handlebars';
import {buttonTmpl} from './button.tmpl.js';

export type ButtonProps = {
  title: string;
  onClick?: string;
  uiType?: 'primary' | 'secondary' | 'third';
  type?: 'button' | 'submit';
}

const Button = ({title, onClick, uiType = 'primary', type = 'button'}: ButtonProps) => {
  return Handlebars.compile(buttonTmpl)({title, onClick, uiType, type});
}

export default Button;
