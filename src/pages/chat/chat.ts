import Block from '../../classes/Block.ts';
// import { ChatsType, UserProfileType } from '../../types/chats.ts';
import chatTmpl from './chat.tmpl.ts';
//import { ChatItem } from '../../components/index.ts';
/*
interface ChatPageProps {
 activeChat: string | null;
 chats: ChatsType;
 profile: UserProfileType;
}
 */

/*
const buttonSearch = Button({
    title: 'Search',
    onClick: '',
    uiType: 'third',
    type: 'button',
});

const profileButton = Button({
    title: 'Profile',
    onClick: 'window.location.href="/profile"',
    uiType: 'third',
    type: 'button',
});

const buttonSend = Button({
    title: 'Send',
    onClick: '',
    uiType: 'third',
    type: 'button',
});
 */

/*
const ChatPage = ({ activeChat, chats }: ChatPageProps) => {
    const chatList = chats.map((chat) => ChatItem({
        displayName: chat.displayName || chat.login,
        onClick: `window.location.href='/chat/${chat.login}'`,
        avatar: chat.avatar,
    })).join('');

    return Handlebars.compile(chatTmpl)({
        // buttonSearch,
        // profileButton,
        activeChat,
        chatList,
        // buttonSend,
    });
};
*/
class ChatPage extends Block{
    constructor() {
        super('div', {});
    }

    render() {
        return this.compile({ template: chatTmpl, context: { ...this.props } });
    }
}

export default ChatPage;
