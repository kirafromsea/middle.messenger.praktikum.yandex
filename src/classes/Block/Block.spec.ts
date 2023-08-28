import {expect} from 'chai';
import {TestMockBlock} from '../../testMocks';

describe('Tests for Block', () => {
  it('Render Block component', () => {
    const mockTestBlock = new TestMockBlock({text: 'test text'});
    expect(mockTestBlock.getContent()?.getRootNode().textContent).to.equal('test text');
  });

  it('Block component with children', () => {
    const testBlock = new TestMockBlock({text: 'Test children block', withChildren: true});
    expect(testBlock.getContent()?.getElementsByTagName('span')[0]?.textContent).to.equal('Test child');
  });

  it('Block has events', () => {
    const mockTestBlock = new TestMockBlock({
      text: 'test text',
      events: {
        click: () => 'test',
      },
    });

    expect(mockTestBlock.getProps('events').click !== undefined).to.equal(true);
  });

  it('We can changing props in component', () => {
    const mockTestBlock = new TestMockBlock({
      text: 'test text',
      events: {
        click: () => 'test',
      },
    });
    expect(mockTestBlock.getContent()?.getRootNode().textContent).to.equal('test text');
    mockTestBlock.setProps({text: 'new test text'});
    expect(mockTestBlock.getContent()?.getRootNode().textContent).to.equal('new test text');
  });
});
