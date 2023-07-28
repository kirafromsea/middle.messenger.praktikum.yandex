import {KeysOf} from '../../types/base';

const addChatInputs = [
  {
    name: 'title',
    type: 'text',
    value: '',
    placeholder: 'Chat title',
    required: true,
    description: '',
  },
];

export const modalsMap = {
  addChat: {
    inputs: addChatInputs,
    title: 'Create new chat'
  },
};


export type ModalsSettingsNameProps = keyof KeysOf<typeof modalsMap>
