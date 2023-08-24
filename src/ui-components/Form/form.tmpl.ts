const formTmpl = `
    <form action="javascript:void(0);" class="{{formClassName}}">
        {{#if title}}
            <h2 class="{{formClassName}}__title">{{title}}</h2>
        {{/if}}
        <div class="form-controls">
            {{#each controls}}
                {{{this}}}
            {{/each}}
        </div>
        <div class="form-buttons">
            {{#each buttons}}
                {{{this}}}
            {{/each}}
        </div>
    </form>
`;

export default formTmpl;
