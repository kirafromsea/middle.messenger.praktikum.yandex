export const registrationTmpl = `
  <div class="auth-page">
    <form class="auth-form" action="javascript:void(0);">
        <h2 class="auth-form__title">Sign Up</h2>
        <input name="first_name" placeholder="Name" />
        <input name="second_name" placeholder="Surname" />
        <input name="login" placeholder="Username" />
        <input name="email" placeholder="Email" />
        <input name="phone" placeholder="Phone" />
        <input type="password" name="password" placeholder="Password" />
        {{{button}}}
        <a href="/login">Log In</a>
    </form>
  </div>
`;
