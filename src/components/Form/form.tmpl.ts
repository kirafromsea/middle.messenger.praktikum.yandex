const formTmpl = `
    <form action="javascript:void(0);" class="{{formClassName}}">
        {{#if title}}
            <h2 class="{{formClassName}}__title">{{title}}</h2>
        {{/if}}
        {{#each controls}}
            {{{this}}}
        {{/each}}
        {{#each buttons}}
            {{{this}}}
        {{/each}}
    </form>
`;

export default formTmpl;
