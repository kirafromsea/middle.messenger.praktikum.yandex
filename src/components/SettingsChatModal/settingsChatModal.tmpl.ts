const chatModalTmpl = `
  <div class="modal-shadow modal-shadow--hide">
    <div class="modal-content">
        <div class="modal-close">{{{closeButton}}}</div>
        <div class="modal-form">
            <h2 class="modal-chat__title">Chat's settings</h2>
            <div class="modal__avatar-settings">
                {{{avatar}}}
                {{{changeAvatar}}}
            </div>
            <div class="modal__users-list">
                {{{usersList}}}
                {{{addUser}}}
            </div>
        </div>
        <div class="modal-chat__delete-chat">
            {{{deleteChat}}}
        </div>
    </div>
  </div>
`;

export default chatModalTmpl;
