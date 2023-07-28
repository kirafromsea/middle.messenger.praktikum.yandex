import Block from '../../classes/Block';
import avatarTmpl from './avatar.tmpl';

type AvatarProps = {
    url: string | null;
    controller?: Function;
}

const DEFAULT_AVATAR = '../../../public/avatars/rigel.jpg';

class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(
      'div',
      {
        ...props,
        url: props.url || DEFAULT_AVATAR,
      },
      'avatar-component',
    );
  }

  render() {
    console.log('=avatar', this.props);
    return this.compile({
      template: avatarTmpl,
      context: this.props,
    });
  }
}

export default Avatar;
