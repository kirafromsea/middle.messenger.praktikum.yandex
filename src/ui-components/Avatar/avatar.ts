import Block from '../../classes/Block';
import {DEFAULT_AVATAR} from '../../utils/constants';
import avatarTmpl from './avatar.tmpl';

type AvatarProps = {
    url: string | null;
    controller?: Function;
}

class Avatar extends Block {
  constructor(props: AvatarProps) {
    super({
      ...props,
      url: props.url || DEFAULT_AVATAR,
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
