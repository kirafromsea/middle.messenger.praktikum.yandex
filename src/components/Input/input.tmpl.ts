const inputTmpl = `
  <div class="form-field">
    <input
      data-id={{id}}
      name={{name}}
      placeholder="{{placeholder}}"
      class="{{#if errorMessage}}input--error{{/if}}"
      type="{{type}}"
      value="{{value}}"
    />
    <div class="form-field_error">{{errorMessage}}</div>
 </div>
`;

export default inputTmpl;
