import chatInfo from '../../../public/chats';
import {ChatsInfoType} from '../../types/chats';
import Block from '../../classes/Block';
import Avatar from '../../ui-components/Avatar/avatar';
import profileTmpl from './profile.tmpl';
import Input from '../../ui-components/Input/input';
import Button from '../../ui-components/Button/button';
import Form from '../../ui-components/Form/form';
import {controlsPassword, controlsProfile} from './controlsInputSettings';
import {passwordFormButtons, profileFormButtons} from './buttonsSettings';
import {Paths} from '../../utils/constants';

class ProfilePage extends Block {
  constructor() {
    super('div', {});
  }

  init() {
    const {profile} = chatInfo as ChatsInfoType;
    if (!profile || !profile.login) {
      window.location.href = '/error/401';
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
    return this.compile({template: profileTmpl, context: {...this.props}});
  }
}

export default ProfilePage;
