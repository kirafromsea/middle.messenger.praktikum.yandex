const chatTmpl = `
  <div class="chat-page">
      <div class="chat-left">
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
          {{#if pageLoading}}
              <div class="chat-loading">
                    <div class="page-loader" />
              </div>
           {{else}}
              {{#if activeChat}}
                <div class="chat-header">
                  {{{settingsChatButton}}}
                  {{{activeChatAvatar}}}
                </div>
                  <div class="chat-massages">
                    {{#each messageList}}  
                      {{{this}}}
                    {{/each}}
                  </div>
                  {{{messageForm}}}
              {{/if}}
           {{/if}}
          </div>
      </div>
      {{{addChatModal}}}
      {{{settingsChatModal}}}
  </div>
`;

export default chatTmpl;
