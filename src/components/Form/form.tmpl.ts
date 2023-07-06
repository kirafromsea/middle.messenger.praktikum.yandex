const formTmpl = `
    <form action="javascript:void(0);" class="{{formClassName}}">
        <h2 class="{{formClassName}}__title">{{title}}</h2>
        {{#each controls}}
            {{{this}}}
        {{/each}}
        {{#each buttons}}
            {{{this}}}
        {{/each}}
    </form>
`;

export default formTmpl;
/*
// class="{{formClassName}}"
<h2 class="{{formClassName}}__title">{{title}}</h2>
        {{{formControls}}
        {{{formButton}}}
 */
