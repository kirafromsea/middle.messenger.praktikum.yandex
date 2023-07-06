const chatItemTmpl = `
  <li onClick={{{onClick}}}>
    <span class="chat-user_avatar" style="background-image: url({{{avatar}}})"></span>
    <span class="chat-user_title">{{{displayName}}}</span>
  </li>
`;

export default chatItemTmpl;