import Block from '../classes/Block/Block';

class TestMessenger extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile({template: '<div id="test-component-messenger">Messenger</div>', context: {}});
  }
}

export default TestMessenger;
