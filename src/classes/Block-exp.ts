import Handlebars from 'handlebars';
import { v4 } from 'uuid';
import {Values} from '../types/classes';
import EventBus from './EventBus.ts';

interface MetaBlockType<T = any>{
  props: T;
}

type EventsType = Values<typeof Block.EVENTS>;

class Block<T extends object = {}> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  private _meta: MetaBlockType
  private eventBus: () => EventBus<EventsType>;
  private _element: HTMLElement | null = null; // сам элемент

  protected props: T;

  public id: string | null = null; // уникальный id для каждого блока на странице
  public children: {[id: string]: Block} = {}; // потомки в элементе

  public events: { [key: string]: HTMLElement } = {} // события (?)

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(props: T) {
    const eventBus = new EventBus();

    const { children, ...rest } = this._getChildren(props);

    this.id = v4();
    this.props = this._makePropsProxy({ ...rest });
    this.eventBus = () => eventBus;
    this.events = {};
    this.children = children;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildren(baseProps: T): {
    children: Record<string, Block>,
    props: T
  } {
    console.log('=getChildren', baseProps);
    const children: Record<string, Block | Block[]> = {};
    const props: Record<string, unknown> = {};

    Object.entries(baseProps).forEach(([key, value]) => {
      if (value.isArray() && value.length > 0 && value.every(item => item instanceof Block)) {
        children[key] = value;
      } else {
        if (value instanceof Block) {
          children[key] = value;
        } else {
          props[key] = value;
        }
      }
    });

    return { children, props: props as T };
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  public init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
    /*
    Object.values(this.children).forEach((child: Block): void => {
       child.dispatchComponentDidMount();
    }); */
  }

  public componentDidMount() {}

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

  private _componentDidUpdate(oldProps: T, newProps: T) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // @ts-ignore
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  protected componentDidUpdate(oldProps: T, newProps: Partial<T>) {
    return true;
  }

  setProps = (nextProps: Partial<T>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    this.componentDidUpdate(this.props, nextProps);
  };

  getProps = (key: string) => this.props[key];

  get element() {
    return this._element;
  }

  private _render() {
    const element = this.render();
    const newElement = element.firstElementChild as HTMLElement;

    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._removeEvents();
    this._addEvents();
    this._addAtribute();
  }

  // Может переопределять пользователь, необязательно трогать
  render() {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: T) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target: T, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: T, prop: string, value) {
        const oldProps = { ...target };
        target[prop as keyof T] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Not access');
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  private _addEvents(): void {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  private _addAtribute() {
    const { attr = {} } = this.props;
    Object.entries(attr).forEach(([key, value]) => {
      this._element?.setAttribute(key, String(value));
    });
  }

  protected compile({template, props}: {template: string; props: any}) {
    const newProps = {...props};
    Object.entries(this.children).forEach(([key, child]: [string, Block]) => {
      if (Array.isArray(child)) {
        newProps[key] = child.map(item => `<div data-id="${item.id}"></div>`)
      } else {
        newProps[key] = `<div data-id="${child?.id}"></div>`;
      }
    });

    const content = Handlebars.compile(template)(newProps);

    const templateContent = document.createElement('template');
    templateContent.innerHTML = content;

    return templateContent.content;
  }

  public show() {
    const content = this.getContent();
    if (content) {
      content.style.display = 'block';
    }
  }

  public hide() {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  }
}

export default Block;
