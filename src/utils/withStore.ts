import Store, {StoreState} from '../classes/Store';
import Block from '../classes/Block';

export enum StoreEvents {
  Updated = 'updated',
}
export default function withStore<ST>(mapStateToProps: (state: StoreState) => ST) {
  return function wrap<T>(Component: typeof Block) {
    return class WithStore extends Component {
      constructor(props: Omit<T, keyof ST>) {
        let previousState = mapStateToProps(Store.getState());

        super({...(props as T), ...previousState});

        Store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(Store.getState());

          previousState = stateProps;

          this.setProps({...stateProps});
        });
      }
    };
  };
}
