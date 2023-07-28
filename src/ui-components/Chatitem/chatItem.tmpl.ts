const chatItemTmpl = `
  <li>
    <span class="chat-user_avatar" style="background-image: url({{avatar}})"></span>
    <span class="chat-user_title">
        {{title}}
        {{#if unread_message}}
            new: {{unread_message}}
        {{/if}}
    </span>
  </li>
`;

export default chatItemTmpl;
