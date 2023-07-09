const messageItemTmpl = `
    <div class="message-item message-item--{{{type}}}">
        <div class="message-item_avatar" style="background-image: url({{{avatar}}})"></div>
        <div class="message-item_message">
            <div class="message-item_content">{{{message}}}</div>
            <div class="message-item_data">{{{data}}}</div>
        </div>
    </div>
`;

export default messageItemTmpl;
