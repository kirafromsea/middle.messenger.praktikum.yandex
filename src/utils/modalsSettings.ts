import {KeysOf} from '../types/base';
import settingsChatModalTmpl from '../components/SettingsChatModal/settingsChatModal.tmpl';

export const modalsMap = {
  settingsChat: {
    tmpl: settingsChatModalTmpl,
    title: 'Chat\'s settings',
    formName: 'settings-chat-modal',
    inputs: [{
      name: 'title',
      type: 'text',
      value: '',
      placeholder: 'Chat title',
      required: true,
      description: '',
    }],
  },
};

export type ModalsSettingsNameProps = keyof KeysOf<typeof modalsMap>
