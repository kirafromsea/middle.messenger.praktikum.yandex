const chatTmpl = `
  <div class="chat-page">
    <div class="chat-left">
        <div class="chat-header">
            <input class="chat-search" /> {{{buttonSearch}}}
        </div>
        <div class="chat-list">
          <ul>
              {{{chatList}}}
          </ul>
        </div>
        <div class="chat-bottom">{{{profileButton}}}</div>
    </div>
    <div class="chat-right">
        <div class="chat-header"></div>
        <div class="chat-massages">Messages</div>
        <div class="chat-bottom"><input class="chat-message--new" /> {{{buttonSend}}}</div>
    </div>
  </div>
`;

export default chatTmpl;
