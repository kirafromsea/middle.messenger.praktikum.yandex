const usersListTmpl = `
  <div class="modal-chat__user-list">
    <ul class="users-list">
      {{#each usersList}}
          <li>
            <span>
                {{{this.display_name}}}
                {{#if this.isAdmin}}
                    <span class="user-role--admin">*</span>
                {{/if}}
            </span>
            {{#if this.isAdmin}}
             {{else}} {{{this.deleteUserButton}}}  
             {{/if}}
          </li>
       {{/each}}
    </ul>
  </div>
`;

export default usersListTmpl;
