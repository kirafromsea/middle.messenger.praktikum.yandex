/* eslint-disable no-unused-expressions */
import {expect} from 'chai';
import {JSDOM} from 'jsdom';
import {TestSignUp, TestMessenger} from '../../testMocks';
import Router from './Router';

const dom = new JSDOM('<div id=\'app\'></div>', {url: 'http://localhost:3000'});

(global as any).document = dom.window.document;
(global as any).window = dom.window;

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
