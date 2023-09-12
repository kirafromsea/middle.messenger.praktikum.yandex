import Block from '../classes/Block/Block';

const testMockBlockTmpl = '<div>{{text}}{{#if withChildren}}<span id="test-block__children">{{{testChild}}}</span>{{/if}}</div>';

type TestBlockProps = {
  text: string;
  withChildren?: boolean;
  events?: {
    [key: string]: (e?: Event) => void
  }
}

class TestMockBlock extends Block {
  constructor(props: TestBlockProps) {
    super({
      ...props,
      withChildren: !!props.withChildren,
    });
  }

  init() {
    if (this.props.withChildren) {
      this.children.testChild = new TestMockBlock({text: 'Test child'});
    }
  }

  render() {
    return this.compile({template: testMockBlockTmpl, context: this.props});
  }
}

export default TestMockBlock;
