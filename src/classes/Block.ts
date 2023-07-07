import Handlebars from 'handlebars';
import { v4 } from 'uuid';
import EventBus from './EventBus.ts';

class Block<T extends object = {}> {
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

    public children: Record<string, Block | Block[]>; // потомки в элементе

    public tagName: string;

    public events: { [key: string]: HTMLElement } | any; // события

    /** JSDoc
     * @param {string} tagName
     * @param {Object} initProps
     *
     * @returns {void}
     */
    constructor(tagName: string, initProps: T) {
        // конструктор - здесь собираем всё необходимое для дайльнейшей работы
        const eventBus = new EventBus();

        const { props, children } = this._getChildren(initProps);

        this.id = v4();
        this.children = children;
        this.props = this._makeProxyProps({ ...props, id: this.id });
        this.tagName = tagName;

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
        console.log('=this', this);
    }

    private _getChildren(initProps: T): {
        props: T
        children: Record<string, Block | Block[]>
    } {
        const props: Record<string, unknown> = {};
        const children: Record<string, Block | Block[]> = {};

        Object.entries(initProps).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length > 0 && value.every((v) => v instanceof Block)) {
                children[key as string] = value;
            } else if (value instanceof Block) {
                children[key as string] = value; // TODO типы
            } else {
                props[key] = value;
            }
        });

        return { props: props as T, children };
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

    private _componentDidUpdate(oldProps: T, newProps: T) {
        // то чот происходит при обновлении пропсов
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
                const oldTarget = { ...target };
                target[prop as keyof T] = value;

                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
        });
    }

    private _addEvents() {
        // добавление событий. Необходимо занести их в events и навесить слушатели событий
        const { events = {} } = this.props;
        if (!events || !this._element) {
            return;
        }

        Object.keys(events).forEach((event) => {
            this._element.addEventListener(event, events[event]);
        });
    }

    private _removeEvents() {
        // в случае удаления событий, необходимо убрать слушатели
        const { events = {} } = this.props;

        if (!events || !this._element) {
            return;
        }

        Object.keys(events).forEach((event) => {
            this._element?.removeEventListener(event, events[event]);
        });
    }

    public compile({ template, context }): DocumentFragment {
        const contextAndDummies = { ...context };
        console.log('=contextAndDummies', contextAndDummies);

        Object.entries(this.children).forEach(([name, component]) => {
            if (Array.isArray(component)) {
                contextAndDummies[name] = component.map((child) => `<div data-id="${child.id}"></div>`);
            } else {
                contextAndDummies[name] = `<div data-id="${component.id}"></div>`;
            }
        });
        console.log('=compile html 1');
        const html = Handlebars.compile(template)(contextAndDummies);
        console.log('=compile html 2', html);
        const temp = document.createElement('template');
        temp.innerHTML = html;

        /**
         * @description Replaces a dummy element with a real one, storing all childNodes in the component
         *
         * @param {Block} component (handlebars)
         * */
        const replaceDummy = (component: Block) => {
            const dummy = temp.content.querySelector(`[data-id="${component.id}"]`);
            if (!dummy) return;
            component.getContent()?.append(...Array.from(dummy.childNodes));
            dummy.replaceWith(component.getContent()!);
        };

        Object.entries(this.children).forEach(([_, component]) => {
            if (Array.isArray(component)) {
                component.forEach((comp) => replaceDummy(comp));
            } else {
                replaceDummy(component);
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

    public componentDidUpdate(oldProps: T, newProps: T) { return true; } // может быть переопределено пользователем

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
        Object.assign(this.props, nextProps);
        this.componentDidUpdate(this.props, nextProps);
    }

    getProps = (key: string) =>
        // прлучение значения одного пропса
        this.props[key];


    get element() {
        // получение самого элемента
        return this._element;
    }

    public getContent(): HTMLElement {
        // получение контента
        return this._element;
    }

    public show() {}

    public hide() {}
}

export default Block;
