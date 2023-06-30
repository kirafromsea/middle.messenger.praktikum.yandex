const profileTmpl = `
  <div class="page profile-page">
    <div class="page_content">
        <div class="return-chat">{{{returnButton}}}</div>
        <div class="avatar" style="background-image: url({{profile.avatar}})"></div>
        <form class="user-info" action="javascript:void(0);">
            <div><strong>First name:</strong> <input type="text" name="first_name" placeholder="Name" value="{{{profile.first_name}}}"/> </div>
            <div><strong>Second name:</strong> <input type="text" name="second_name" placeholder="Surname" value="{{{profile.second_name}}}" /> </div>
            <div><strong>Display name:</strong> <input type="text" name="display_name" placeholder="Name in chat" value="{{{profile.display_name}}}" /> </div>
            <div><strong>Login:</strong> <input type="text" name="login" placeholder="Username" value="{{{profile.login}}}" /> </div>
            <div><strong>E-mail:</strong> <input type="text" name="email" placeholder="Email" value="{{{profile.email}}}" /> </div>
            <div><strong>Phone:</strong> <input type="tel" name="phone" placeholder="Phone" value="{{{profile.phone}}}" /> </div>
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

export default profileTmpl;
