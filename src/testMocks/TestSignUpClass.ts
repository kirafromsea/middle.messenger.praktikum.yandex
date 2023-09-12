import Block from '../classes/Block/Block';

export default class TestSignUp extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile({template: '<div id="test-component-signup">SignUp</div>', context: {}});
  }
}
