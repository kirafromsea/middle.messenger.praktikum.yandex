import Block from '../../classes/Block.ts';
import avatarTmpl from './avatar.tmpl.ts';

type AvatarProps = {
    avatarUrl: string;
}
class Avatar extends Block {
    constructor(props: AvatarProps) {
        console.log('=avatarprops', props);
        super('div', {
            ...props,
        });
    }

    init() {}

    render() {
        return this.compile({
            template: avatarTmpl,
            context: this.props,
        });
    }
}

export default Avatar;