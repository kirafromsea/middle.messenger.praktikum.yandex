import Handlebars from 'handlebars';
import {profileTmpl} from './profile.tmpl.js';
import {Button} from '../../components';

const sendProfileButton = Button({
  title: 'Save profile',
  onClick: '',
  uiType: 'primary',
  type: 'submit'
});

const sendPasswordButton = Button({
  title: 'Save new password',
  onClick: '',
  uiType: 'primary',
  type: 'button'
});

const returnButton = Button({
  title: 'X',
  onClick: "window.location.href='/chat'",
  uiType: 'third',
  type: 'button'
});

const ProfilePage = ({...profile}) => {
  return Handlebars.compile(profileTmpl)({
    profile,
    returnButton,
    sendProfileButton,
    sendPasswordButton
  });
}

export default ProfilePage;
