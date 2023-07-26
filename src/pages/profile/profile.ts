import Block from '../../classes/Block';
import Store from '../../classes/Store';
import AuthController from '../../controllers/AuthController';
import {Paths} from '../../utils/constants';
import Avatar from '../../ui-components/Avatar/avatar';
import Input from '../../ui-components/Input/input';
import Button from '../../ui-components/Button/button';
import Form from '../../ui-components/Form/form';
import {controlsPassword, controlsProfile} from './controlsInputSettings';
import {passwordFormButtons, profileFormButtons} from './buttonsSettings';
import profileTmpl from './profile.tmpl';
import ProfileController from "../../controllers/ProfileController";

class ProfilePage extends Block {
 constructor() {
   AuthController.getUser();
   const {user, auth} = Store.getState();
   super('div', {profile: auth ? user : null});
  }

  async init() {
   const {profile} = this.props;
    if (!profile) {
      //window.location.href = '/error/401';
      return;
    }

    const profileFormInput = controlsProfile.map((item) => new Input({
      ...item,
      value: profile[item.name as string] as string,
    }));

    const buttonsProfile = profileFormButtons.map((item) => new Button({...item}));

    this.children.profileForm = new Form({
      controls: profileFormInput,
      buttons: buttonsProfile,
      controller: ProfileController.updateProfile.bind(ProfileController),
      formClassName: 'user-info',
    });

    const passwordFormInputs = controlsPassword.map((item) => new Input({
      ...item,
      value: profile[item.name] || '',
    }));

    const buttonsPassword = passwordFormButtons.map((item) => new Button({...item}));

    this.children.passwordForm = new Form({
      controls: passwordFormInputs,
      buttons: buttonsPassword,
      controller: ProfileController.updatePassword.bind(ProfileController),
      formClassName: 'user-password',
    });

    this.children.returnButton = new Button({
      title: 'X',
      uiType: 'third',
      type: 'button',
      events: {
        onClick: () => {
          window.location.href = Paths.Chat;
        },
      },
    });

    this.children.avatar = new Avatar({url: profile.avatar || ''});
  }

  render() {
    console.log('=render profile');
    return this.compile({template: profileTmpl, context: {...this.props}});
  }
}

export default ProfilePage;
