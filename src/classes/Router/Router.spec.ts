/* eslint-disable no-unused-expressions */
import {expect} from 'chai';
import {JSDOM} from 'jsdom';
import Block from '../Block';
import Router from './Router';


const dom = new JSDOM('<div id=\'app\'></div>', {url: 'http://localhost:3000'});

(global as any).document = dom.window.document;
(global as any).window = dom.window;

class TestSignUp extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile({template: '<div id="test-component-signup">SignUp</div>', context: {}});
  }
}

class TestMessenger extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile({template: '<div id="test-component-messenger">Messenger</div>', context: {}});
  }
}

describe('Router', () => {
  it('Should there be an element', () => {
    Router.use('/', TestSignUp).start();
    expect(!!document.getElementById('test-component-signup')).to.be;
  });

  it('If not auth, not open messenger (redirect to index)', () => {
    Router
      .use('/sign-up', TestSignUp)
      .use('/messenger', TestMessenger)
      .start();

    Router.go('/messenger');
    expect(Router.getCurrentRoute()?.getPathname()).to.equal('/');
  });
});
