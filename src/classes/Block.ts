import Handlebars from 'handlebars';
import { v4 } from 'uuid';
import {Values} from '../types/classes';
import EventBus from './EventBus.ts';

interface MetaBlockType<T = any>{
    tagName,
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
    constructor({tagName, props}: T) {
        // конструктор - здесь собираем всё необходимое для дайльнейшей работы
    }

    private _registerEvents(eventBus: EventBus<EventsType>) {
        // регистрируем все доступные события
    }

    private _createResources() {
        // создает ресурс. Необходимо указать тег. Тег передается при создании объекта
    }

    private _componentDidMount(props: T) {
        // то что должно происходить при монтировании элемента
    }

    // public dispatchComponentDidMount

    private _componentDidUpdate(oldProps: T, newProps: T) {
        // то чот происходит при обновлении пропсов
    }

    private _makeProxyProps(props: T) {
        // правила для работы с пропсами создание/изменение/удаление
    }

    private _createDocumentElement(tagName: string) {
        // создание элемента с указанным тегом
        return document.createElement(tagName);
    }

    private _addEvents() {
        // добавление событий. Необходимо занести их в events и навесить слушатели событий
    }

    private _removeEvents() {
        // в случае удаления событий, необходимо убрать слушатели
    }

    private _addAttribute() {
        // добавление атрибутов
    }

    private _compile(): DocumentFragment {
        // собираем всех детей
        const fragment = document.createElement("template");

        return fragment.content;
    }

    // private _getChildren

    private _render() {
        // рендер элемента
    }

    // ?
    protected getStateFromProps(props: T) {}

    protected render(): string {
        return '';
    }

    public init() {
        // инициализация
    }

    public componentDidMount(props: T) {} // может быть переопределено пользователем
    public componentDidUpdate(oldProps: T, newProps: T) { return true; } // может быть переопределено пользователем

    public setProps(nextProps: T) {
        // изменение/добавление пропсов
    }

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
