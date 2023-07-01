const inputTmpl = `
 <div class="form-field">
    <input data-id={{dataId}} class={{errorMessage ? "input--error" : ""}} name="{{name}}" type="{{type}}" placeholder="{{placeholder}}" value="{{value}}" />
    <div class="form-field_error">{{errorMessage}}</div>
 </div>
`;

export default inputTmpl;
