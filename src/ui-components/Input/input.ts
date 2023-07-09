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
        [key: string]: () => void
    }
}

class Input extends Block {
    constructor(props: InputProps) {
        super('input', {
            regExpValidate: null,
            events: {},
            required: false,
            errorMessage: null,
            ...props,
        });
    }

    init() {
        this.setProps({
            events: {
                change: (e: Event) => {
                    this.setValue(e.target.value);
                    this.validate();
                },
            },
        });
    }

    validate() {
        const value = this.getValue().trim() || '';
        if (this.getProps('required') && (!value || value === '')) {
            this.setProps({ errorMessage: 'Not required' });
        } else if (this.getProps('regExpValidate')) {
            const valid = this.getProps('regExpValidate').test(value);
            this.setProps({ errorMessage: !valid ? 'Incorrect value' : null });
        } else {
            this.setProps({ errorMessage: null });
        }

        return {
            name: this.getProps('name'),
            value: this.getProps('value'),
            errorMessage: this.getProps('errorMessage'),
        };
    }

    public setValue(value: string) {
        this.setProps({ value });
    }

    public getValue() {
        return (this.getContent().getElementsByTagName('input'))[0].value;
    }

    render() {
        return this.compile({
            template: inputTmpl,
            context: this.props,
        });
    }
}

export default Input;
