export const profileTmpl = `
  <div class="page profile-page">
    <div class="page_content">
        <div class="return-chat">{{{returnButton}}}</div>
        <div class="avatar" style="background-image: url({{profile.avatar}})"></div>
        <form class="user-info" action="javascript:void(0);">
            <div><strong>First name:</strong> <input name="first_name" placeholder="Name" value={{{profile.first_name}}}/> </div>
            <div><strong>Second name:</strong> <input name="second_name" placeholder="Surname" value={{{profile.second_name}}} /> </div>
            <div><strong>Login:</strong> <input name="login" placeholder="Username" value={{{profile.login}}} /> </div>
            <div><strong>E-mail:</strong> <input name="email" placeholder="Email" value={{{profile.email}}} /> </div>
            <div><strong>Phone:</strong> <input name="phone" placeholder="Phone" value={{{profile.phone}}} /> </div>
            {{{sendProfileButton}}}
        </form>
        <form class="user-password" action="javascript:void(0);">
            <div><strong>Password:</strong> <input type="password" name="oldPassword" placeholder="Old Password" /> </div>
            <div><strong>New password:</strong> <input type="password" name="newPassword" placeholder="New password" /> </div>
            {{{sendPasswordButton}}}
        </form>
    </div>
  </div>
`;
