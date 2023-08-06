const chatItemTmpl = `
  <li {{#if isActive}}class="chat-list--active"{{/if}}>
    <span class="chat-user_avatar"><img src="{{{avatar}}}" /></span>
    <span class="chat-user_title">
        {{title}}
        {{#if unread_message}}
            new: {{unread_message}}
        {{/if}}
    </span>
  </li>
`;

export default chatItemTmpl;
