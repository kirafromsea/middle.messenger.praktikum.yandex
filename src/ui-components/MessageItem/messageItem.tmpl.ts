const messageItemTmpl = `
    <div class="message-item message-item--{{{type}}}">
        <div class="message-item_avatar"><img src="{{avatar}}" /></div>
        <div class="message-item_message">
            <div class="message-item_content">{{{message}}}</div>
            <div class="message-item_data">{{{date}}}</div>
        </div>
    </div>
`;

export default messageItemTmpl;
