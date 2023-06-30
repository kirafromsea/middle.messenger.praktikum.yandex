import { v4 } from 'uuid';
import EventBus from './EventBus.ts';

interface BlockPropsType {
    [index: string]: any,
    // eslint-disable-next-line no-use-before-define
    children?: Record<string, Block>
}

interface BlockConstructorType {
    tagName: string;
    props: BlockPropsType;
}

class Block<T extends Record<string, any> = any> {
    static EVENTS: Record<string, string> = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    protected props: T;
    private eventBus: () => EventBus;
    private _element: HTMLElement | null = null;
    public id: string | null = null;
    public events: Record<string, Function>;
    public children: Record<string, Block | Block[]>;
    _meta: {tagName: string, props?: BlockPropsType};

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor({tagName = 'div', children, props}: T) {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props
        };

        this.children = children;
        this.id = v4();
        this.props = this._makePropsProxy(props);
        this.eventBus = () => eventBus;
        this.events = {};

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on({event: Block.EVENTS.INIT, callback: this.init.bind(this)});
        eventBus.on({event: Block.EVENTS.FLOW_CDM, callback: this._componentDidMount.bind(this)});
        eventBus.on({event: Block.EVENTS.FLOW_CDU, callback: this._componentDidUpdate.bind(this)});
        eventBus.on({event: Block.EVENTS.FLOW_RENDER, callback: this._render.bind(this)});
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
        });*/
    }

    public componentDidMount() {}

    public dispatchComponentDidMoun() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps: T, newProps: T) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    // Может переопределять пользователь, необязательно трогать
    protected componentDidUpdate(oldProps: T, newProps: Partial<T>) {
        return true;
    }

    setProps = (nextProps: Partial<T>) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps)
        this.componentDidUpdate(this.props, nextProps)
    };

    getProps = (key: string) => {
        return this.props[key];
    }

    get element() {
        return this._element;
    }

    private _render() {
        const fragment = this.render();

        const newElement = fragment.firstElementChild as HTMLElement

        if (this._element && newElement) {
            this._element.replaceWith(newElement)
        }

        this._element = newElement

        this._addEvents()
    }

    // Может переопределять пользователь, необязательно трогать
    render() {}

    getContent() {
        return this.element;
    }

    _makePropsProxy(props) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;

        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop, value) {
                console.log('=set', value);
                target[prop] = value;
                console.log('=target', target, self._prevProps);
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, self._prevProps, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            },
        });
    }

    _createDocumentElement(tagName) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    public _addEvents(): void {
        const { events = {} } = this.props;
        Object.keys(events).forEach((eventName) => {
            this.events[eventName] = events[eventName].bind('', this);
            this._element.addEventListener(eventName, this.events[eventName]);
        });
    }
    show() {
        const content = this.getContent();
        if (content) {
            content.style.display = 'block';
        }
    }

    hide() {
        const content = this.getContent();
        if (content) {
            content.style.display = 'none';
        }
    }
}