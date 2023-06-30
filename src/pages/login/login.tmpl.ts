const loginTmpl = `
  <div class="auth-page">
    <form class="auth-form" action="javascript:void(0);">
        <h2 class="auth-form__title">Log In</h2>
        <input type="login" name="login" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        {{{button}}}
        <a href="/signup">Sign Up</a>
    </form>
  </div>
`;

export default loginTmpl;
