import Handlebars from 'handlebars';
import {profileTmpl} from './profile.tmpl.js';
import {Button} from '../../components';

const sendProfileButton = Button({
  title: 'Save profile',
  onClick: '',
  type: 'primary'
});

const sendPasswordButton = Button({
  title: 'Save new password',
  onClick: '',
  type: 'primary'
});

const returnButton = Button({
  title: 'X',
  onClick: "window.location.href='/chat'",
  type: 'third'
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
