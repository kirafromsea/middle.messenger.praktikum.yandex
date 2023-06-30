const registrationTmpl = `
  <div class="auth-page">
    <form class="auth-form" action="javascript:void(0);">
        <h2 class="auth-form__title">Sign Up</h2>
        <input type="text" name="first_name" placeholder="Name" />
        <input type="text" name="second_name" placeholder="Surname" />
        <input type="text" name="login" placeholder="Username" />
        <input type="email" name="email" placeholder="Email" />
        <input type="tel" name="phone" placeholder="Phone" />
        <input type="password" name="password" placeholder="Password" />
        {{{button}}}
        <a href="/login">Log In</a>
    </form>
  </div>
`;

export default registrationTmpl;
