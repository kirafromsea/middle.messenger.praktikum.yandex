import {ChatsInfoType, UserProfileType, ChatsType} from '../src/types/chats';
const profile: UserProfileType = {
  first_name: 'Rigel',
  second_name: 'Kastor',
  login: 'betelgeuse',
  display_name: 'Rigel Betelgeuse Kastor II',
  email: 'rigel_kastor@space',
  password: 'tree_star',
  phone: '+07892221415',
  avatar: '/avatars/rigel.jpg'
};

const chats: ChatsType = [
  {
    display_name: 'Link',
    login: 'link',
    avatar: '/avatars/avatar1.jpg',
    messages: [
      {
        author: 'self',
        date: '05/06/2023',
        message: 'Привет, Линк! Пойдем поедим пончиков?'
      },
      {
        author: 'companion',
        date: '05/06/2023',
        message: 'Привет! Минут через 5. Мне опять нужно доставить корока к его другу'
      },
      {
        author: 'self',
        date: '05/06/2023',
        message: 'Зови его с собой. Тут на всех хватит.'
      },
      {
        author: 'self',
        date: '05/06/2023',
        message: 'Только молоко захватите.'
      }
    ]
  },
  {
    display_name: 'Sydon',
    login: 'sydon_sea',
    avatar: '/avatars/avatar3.jpeg',
    messages: [
      {
        author: 'self',
        date: '05/06/2023',
        message: 'Привет!'
      }
    ]
  },
  {
    display_name: 'Mipha',
    login: 'mipha_sea',
    avatar: '/avatars/avatar2.jpeg',
    messages: [
      {
        author: 'self',
        date: '05/06/2023',
        message: 'Привет! Сегодня идем все в деревню Какарико.Там пончики с неба упали'
      }
    ]
  }
];

const chatInfo: ChatsInfoType = {
  profile,
  chats
};

export default chatInfo;
