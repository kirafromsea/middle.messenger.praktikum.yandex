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
            <span>
              {{#if this.canDelete}}
                <button data={{this.id}} class="button button--warnind user-list_delete-button" type="button">Delete</button>
              {{/if}}
            </span>
          </li>
       {{/each}}
    </ul>
  </div>
`;

export default usersListTmpl;
