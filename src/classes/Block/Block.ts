import Handlebars from 'handlebars';
import {v4} from 'uuid';
import {isEqual} from '../../utils/object';
import EventBus from '../EventBus';

class Block<T extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  private eventBus: () => EventBus;

  private _element: HTMLElement | null = null; // сам элемент

  protected props: T;

  public id: string | null = null; // уникальный id для каждого блока на странице

  public children: Record<string, Block<T> | Block<T>[]>; // потомки в элементе

  public events?: { [key: string]: HTMLElement }; // события

  constructor(initProps: T) {
    // конструктор - здесь собираем всё необходимое для дайльнейшей работы
    const eventBus = new EventBus();

    const {props, children} = this._getChildren(initProps);

    this.id = v4();
    this.children = children;
    this.props = this._makeProxyProps({...props, id: this.id});

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildren(initProps: T): {
        props: T
        children: Record<string, Block | Block[]>
    } {
    const propsOther: Record<string, unknown> = {};
    const children: Record<string, Block | Block[]> = {};

    Object.entries(initProps).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0 && value.every((v) => v instanceof Block)) {
        children[key as string] = value;
      } else if (value instanceof Block) {
        children[key as string] = value;
      } else {
        propsOther[key] = value;
      }
    });

    return {props: propsOther as T, children};
  }

  private _init() {
    // инициализация
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _registerEvents(eventBus: EventBus) {
    // регистрируем все доступные события
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _componentDidMount() {
    // то что должно происходить при монтировании элемента
    this.componentDidMount();
  }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _makeProxyProps(props: T) {
    // правила для работы с пропсами создание/изменение/удаление
    const self = this;

    return new Proxy(props, {
      get(target: T, prop: string) {
        if (typeof prop === 'string' && prop.indexOf('_') === 0) {
          throw new Error('No access');
        }

        const value: unknown = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        if (typeof prop === 'string' && prop.indexOf('_') === 0) {
          throw new Error('No access');
        }
        const oldTarget = {...target};
        target[prop as keyof T] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
    });
  }

  private _addEvents() {
    // добавление событий. Необходимо занести их в events и навесить слушатели событий
    const events = this.getProps('events');
    if (!events || !this._element) {
      return;
    }

    Object.keys(events).forEach((event: string) => {
      this._element?.addEventListener(event, events[event]);
    });
  }

  private _removeEvents() {
    // в случае удаления событий, необходимо убрать слушатели
    const events = this.getProps('events');

    if (!events || !this._element) {
      return;
    }

    Object.keys(events).forEach((event) => {
      this._element?.removeEventListener(event, events[event]);
    });
  }

  public compile({template, context = {}}: {template: string; context: any}): DocumentFragment {
    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        context[name] = component.map((child) => `<div data-id="${child.id}"></div>`);
      } else {
        context[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = Handlebars.compile(template)(context);

    const temp = document.createElement('template');
    temp.innerHTML = html;

    const replacePlug = (component: Block) => {
      const plug = temp.content.querySelector(`[data-id="${component.id}"]`);
      if (!plug) return;
      component.getContent()?.append(...Array.from(plug.childNodes));
      plug.replaceWith(component.getContent()!);
    };

    Object.entries(this.children).forEach((item) => {
      const component = item[1];
      if (Array.isArray(component)) {
        component.forEach((comp) => replacePlug(comp));
      } else {
        replacePlug(component);
      }
    });

    return temp.content;
  }

  private _render() {
    // рендер элемента
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._removeEvents();
    this._addEvents();
  }

  // protected getStateFromProps(props: T) {}

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  public init() {}

  public componentDidMount() {} // может быть переопределено пользователем

  componentDidUpdate(oldProps: any, newProps: any) {
    return !isEqual(oldProps, newProps);
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => ch.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  public setProps(nextProps: T) {
    // изменение пропсов
    if (!nextProps) {
      return;
    }

    const prevProps = {...this.props};
    Object.assign(this.props, nextProps);

    this._componentDidUpdate(prevProps, nextProps);
  }

  public getProps(key: string) {
    return this.props[key];
  }

  get element() {
    return this._element;
  }

  public getContent() {
    // получение контента
    return this._element;
  }

  public show() {}

  public hide() {}
}

export default Block;
