import Block from '../../classes/Block';
import avatarTmpl from './avatar.tmpl';

type AvatarProps = {
    avatarUrl: string;
}
class Avatar extends Block {
  constructor(props: AvatarProps) {
    super('div', {
      ...props,
    });
  }

  render() {
    return this.compile({
      template: avatarTmpl,
      context: this.props,
    });
  }
}

export default Avatar;
