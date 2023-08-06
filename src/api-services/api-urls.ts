export const authApi = {
  signup: '/signup',
  login: '/signin',
  userInfo: '/user',
  logout: '/logout',
};

export const chatApi = {
  chats: '', // get - получить чаты текущего пользователя; put - создать чаты текущего пользователя; delete - удалить чат по его ID
  users: '/:id/users', // get - получить пользователей чата по ID;
  newMessages: '/new/:id', // get - получить количество новых сообщений в указанном чате;
  chatAvatar: '/avatar', // put - загрузить аватар чата (через multipart/form-data);
  addUser: '/users', // put - добавить пользователя в чат; delete - удалить пользователей из чата.
};

export const profileApi = {
  changeProfile: '/profile', // put изменить текстовые данные текущего пользователя;
  avatar: '/profile/avatar', // put обновить аватар текущего пользователя (через multipart/form-data)
  changePassword: '/password', // put изменить пароль текущего пользователя;
  userInfo: '/:id', // getf получить информацию о пользователе по ID (можно использовать, например, для отображения аватаров и логинов в чате);
  search: '/search', // поиск пользователей в системе (возвращается максимально 10 человек).
};

export const usersApi = {
  search: '/search', // post - поиск пользователей по логину
};

export const headersJson = {
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
};
