import Block from '../../classes/Block.ts';
import inputTmpl from './input.tmpl.ts';

interface InputProps {
    name: string;
    type: string;
    value?: string;
    description?: string;
    placeholder?: string;
    required?: boolean;
    regExpValidate?: RegExp | null;
    events?: {
        [key: string]: () => void;
    };
}

class Input extends Block {
    constructor(props: InputProps) {
        super({
            tagName: 'input',
            props: {
                events: {},
                regExpValidate: null,
                required: false,
                ...props
            }
        });
    }

    init() {
        if (this.props.regExpValidate) {
            this.props.events.blur = () => this.validate();
        }
    }

    validate() {
        const inputItem = this.getContent();
        const value = this.getValue();
        const valid = this.getProps('regExpValidate').test(value);

        if (this.props.required && (!value || value.trim() === '' )) {
            this.props.errorMessage = 'Not required';
            return;
        }
        if (inputItem) {
            this.props.errorMessage = !valid ? 'Incorrect value' : null;
        }

        return {
            name: this.props.name,
            value: this.props.value,
            isValid: !!this.props.errorMessage, // TODO Попробовать оставить только один параметр isValid или errorMessage
            errorMessage: this.props.errorMessage
        }
    }

    public setValue(value: string) {
        return ((this.element as HTMLInputElement).value = value)
    }

    public getValue() {
        return (this.element as HTMLInputElement).name;
    }

    render() {
        return this.compile({
            template: inputTmpl,
            props: this.props
        });
    }
}

export default Input;
