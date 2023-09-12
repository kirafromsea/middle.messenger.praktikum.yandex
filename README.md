# practicum-chat

Это тестовый прокет на курсе Middle frontend в Практикум. <br />
**Автор**: Кира <br />
**Email**: kirafromsea@gmail.com <br />
**Telegram**: @kirafromsea <br />

Проект выложен в Netlify и доступен по ссылке: [https://tubular-bonbon-96a3af.netlify.app](https://tubular-bonbon-96a3af.netlify.app) <br />
Код доступен в Github: [https://github.com/kirafromsea/middle.messenger.praktikum.yandex](https://github.com/kirafromsea/middle.messenger.praktikum.yandex)<br />
[Figma со схемой для интерфейса](https://www.figma.com/file/QIhlqZO3GESCoKdrnEtt1g/Practicum-Chat?type=design&node-id=52%3A5&mode=design&t=EnUKi7uLkMg9EJvq-1)

## Запуск чата
Для запуска страниц чата необходимо выполнить команду
```npm run start```
Для открытия чата необходимо перейти на ```http://localhost:3000```

Адреса страниц <br />
**Авторизация (Index страница)**: ```/```, <br />
**Регистрация**: ```/sign-up``` <br />
**Чат**: ```/messenger``` <br />
**Профиль**: ```/settings```<br />
**Ошибка**: ```/error```<br />
**Выход из системы**: ```/logout```<br />

## Запуск сервера
Для запуска серверной части выполните команду <br />
```npm run start:server```<br />
Сервер запустится на 4000 порту. Открыть можно по ссылке ```http://localhost:3000``` <br/>
<br />
Код сервера находится в папке ```./server``` <br />
Статика леижт в папке ```./server/static``` <br />

## Запуск тестов
Для запуска тестов необходимо выполнить команду ```npm run test```

## Проверки кода
Для запуска проверки типов ```npm run typescript```
Для запуска проверки стиля кода ```npm run eslint:fix```. Линтер проверит код и исправит то, что может.
Для запуска проверки стилей ```npm run stylelint```

## Технологии
В проекте появились следующие изменения
- Добавлены EventBus и модель Block. Теперь для отрисовки компонентов используется Block.
- В Block контент формируется при помощи шаблонизатора Handlebars.
- Добавлен Typescript для типизации.
- Добавлены eslint и stylelint для проверки кода.
- Настроена работа с методами API 
- Настроена получение/отпрака сообщение при помощи Web Sockets
- Добавлены Mocha и Chai для написания автотестов
- Добавлены проверки перед деплоем с помощью husky и lint-staged
