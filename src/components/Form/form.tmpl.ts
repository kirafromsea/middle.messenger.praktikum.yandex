const formTmpl = `
    <form class="{{formClassName}}>
        <h2 class="{{formClassName}}__title">{{title}}</h2>
        {{{formControls}}
        {{{formButton}}}
    </form>
`;

export default formTmpl;