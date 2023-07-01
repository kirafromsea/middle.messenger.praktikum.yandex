import Block from '../../classes/Block.ts';
import formTmpl from './form.tmpl.ts';

type FormProps = {
    title: string;
    events?: Record<string, Function>;
    controls: Block[];
    buttons: Block[];
    formClassName: string;
};

class Form extends Block {
    constructor(props: FormProps) {
        super({tagName: 'form', title: '', isValid: true, ...props});
    }

    init() {
        const controls = this.children.controls as Block[];
        controls.forEach(control => {
            control.setProps({
               validator: this.validate.bind(this)
            });
        });

        const buttons = this.children.buttons as Block[];
        buttons.forEach(button => {
            button.setProps({
                events: {
                    click: () => this.submit() //? сделать обработку разных кнопок
                }
            })
        })
    }

    validate() {
        const {inputs} = this.children.inputs;
        const inputData = inputs.map(item => item.validate());
        console.log('=form valid inputData', inputData);

        this.props.data = inputData.reduce(
          (result, {name, value}) => ({...result, [name]: value}),
          {}
        );

        const noValidInputs = inputData.filter(item => !item.valid);
        if (noValidInputs.length > 0) {
            this.setProps({isValid: false});
            const warningMessage = noValidInputs.map(item => `- ${item.name} - ${item.errorMessage}`).join('\n');
            console.log('% The form has a problem: ', warningMessage);
        } else {
            this.setProps({isValid: true});
        }
    }

    submit() {
        this.validate();
        const dataForm = this.props.data;
        console.log(`Data for form ${this.props.title}`);
        if (this.props.valid) {
            console.log('Data form is valid. Go to next page');
        } else {
            console.log('Data is not valid. Need change information');
        }
        console.log(dataForm);
    }

    render() {
        return this.compile({
            template: formTmpl,
            props: this.props
        });
    }
}

export default Form;
