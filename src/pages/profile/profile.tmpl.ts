const profileTmpl = `
  <div class="page profile-page">
    <div class="page_content">
        <div class="return-chat">{{{returnButton}}}</div>
        <div class="avatar">
          {{{avatar}}}
          <div class="avatar-upload">
            {{{uploadButton}}}
          </div>
        </div>
        {{{profileForm}}}
        {{{passwordForm}}}
        <div class="chat-logout">
            {{{logoutButton}}}
        </div>
    </div>
  </div>
`;

export default profileTmpl;
