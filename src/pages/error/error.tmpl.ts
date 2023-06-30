const errorTmpl = `
  <div class="page error-page">
    <div class="page_content">
      <h1 class="error-page_number">{{{errorNumber}}}</h1>
      <div class="error-page_message">{{{errorMessage}}}</div>
      <div class="error-page_action">{{{button}}}</div>
    </div>
  </div>
`;

export default errorTmpl;
