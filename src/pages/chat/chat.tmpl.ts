const chatTmpl = `
  <div class="chat-page">
    <div class="chat-left">
        {{{searchForm}}}
        <div class="chat-list">
          <ul>
            {{#each chatsList}}
                {{{this}}}
            {{/each}}
          </ul>
        </div>
        <div class="chat-bottom">
            {{{profileButton}}}
            {{{buttonNewChat}}}
        </div>
    </div>
    <div class="chat-right">
        <div class="chat-right">
            <div class="chat-header"></div>
            <div class="chat-massages">
              {{#each messageList}}  
                {{{this}}}
              {{/each}}
            </div>
            {{{messageForm}}}
        </div>
    </div>
    {{{addChatModal}}}
  </div>
`;

export default chatTmpl;
