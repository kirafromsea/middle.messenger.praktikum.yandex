import chatInfo from '../../../public/chats.js';
import Block from '../../classes/Block.ts';
import Avatar from '../../ui-components/Avatar/avatar.ts';
import profileTmpl from './profile.tmpl.ts';
import Input from '../../ui-components/Input/input.ts';
import Button from '../../ui-components/Button/button.ts';
import Form from '../../ui-components/Form/form.ts';
import { controlsPassword, controlsProfile } from './controlsInputSettings.ts';
import { passwordFormButtons, profileFormButtons } from './buttonsSettings.ts';

class ProfilePage extends Block {
    constructor() {
        super('div', {});
    }

    init() {
        if (!chatInfo.profile || !chatInfo.profile.login) {
            window.location.href = '/error/401';
            return;
        }
        const profileFormInput = controlsProfile.map((item) => new Input({
            ...item,
            value: chatInfo.profile[item.name] || '',
        }));

        const buttonsProfile = profileFormButtons.map((item) => new Button({ ...item }));

        this.children.profileForm = new Form({
            controls: profileFormInput,
            buttons: buttonsProfile,
            formClassName: 'user-info',
        });

        const passwordFormInputs = controlsPassword.map((item) => new Input({
            ...item,
            value: chatInfo.profile[item.name] || '',
        }));

        const buttonsPassword = passwordFormButtons.map((item) => new Button({ ...item }));

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
                    window.location.href = '/chat';
                },
            },
        });

        this.children.avatar = new Avatar({ avatarUrl: chatInfo.profile.avatar });
    }

    render() {
        return this.compile({ template: profileTmpl, context: { ...this.props } });
    }
}

export default ProfilePage;
